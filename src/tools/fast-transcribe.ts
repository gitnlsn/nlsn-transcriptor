import { execPromise } from '../utils/execPromise';
import { transcribe } from '../utils/transcribe';
import { validateFile } from '../utils/validateFile';
import { mkTemp } from '../utils/mkTemp';
import { getAudioDuration } from '../utils/getAudioDuration';
import { segmentation } from '../utils/segmentation';
import { generateSegmentationMetadata } from '../utils/generateSegmentationMetadata';
import { Speech } from '../interfaces/speech';

interface MainProps {
  filePath: string;
  modelPath: string;
  segmentLength?: number;
  parallelTasks?: number;
}

const main = async ({
  filePath,
  modelPath,

  segmentLength = 600,
  parallelTasks = 4,
}: MainProps) => {
  const validFile = await validateFile({ filePath });

  if (!validFile) {
    throw new Error('Invalid file');
  }

  const duration = await getAudioDuration({ filePath });

  const segmentationMetadataList = generateSegmentationMetadata({
    totalDuration: duration,
    segmentLength,
  });

  const trancriptionPromiseTriggers = segmentationMetadataList.map(
    (metadata) => async () => {
      const segmentFile = await mkTemp({
        ext: '.wav',
        dryRun: true,
      });

      await segmentation({
        ...metadata,

        filePath,
        outfilePath: segmentFile,
      });

      const { transcription } = await transcribe({
        filePath: segmentFile,
        modelPath,
      });

      await execPromise(`rm ${segmentFile}`);

      return transcription.map<Speech>((speech) => ({
        ...speech,
        time: speech.time + metadata.start,
      }));
    },
  );

  let transcription: Speech[] = [];

  const comsumeStackThread = async (
    promiseStack: typeof trancriptionPromiseTriggers,
  ) => {
    while (promiseStack.length > 0) {
      const promiseTrigger = promiseStack.pop();

      await promiseTrigger().then((newTranscription) => {
        transcription = [...transcription, ...newTranscription];
      });
    }
  };

  await Promise.all(
    Array.from(Array(parallelTasks).keys()).map(() =>
      comsumeStackThread(trancriptionPromiseTriggers),
    ),
  );

  transcription = transcription.sort((left, right) => left.time - right.time);

  return {
    transcription,
  };
};

const args = process.argv.slice(2);
main({
  filePath: args[0],
  modelPath: args[1],
  segmentLength: args[2] ? Number(args[2]) : undefined,
  parallelTasks: args[3] ? Number(args[3]) : undefined,
})
  .then((output) => console.log(JSON.stringify(output)))
  .catch(console.error);
