import { execPromise } from '../utils/execPromise';
import { convertWav } from '../utils/convertWav';
import { transcribe } from '../utils/transcribe';
import { validateFile } from '../utils/validateFile';
import { mkTemp } from '../utils/mkTemp';

interface MainProps {
  filePath: string;

  modelPath: string;
}

const main = async ({
  filePath,

  modelPath,
}: MainProps) => {
  const validFile = await validateFile({ filePath });

  if (!validFile) {
    throw new Error('Invalid file');
  }

  const wavFile = await mkTemp({ ext: '.wav', dryRun: true });
  await convertWav({ filePath, outfilePath: wavFile });

  const { transcription } = await transcribe({
    filePath: wavFile,
    modelPath,
  });

  await execPromise(`rm ${wavFile}`);

  return {
    transcription,
  };
};

const args = process.argv.slice(2);
main({
  filePath: args[0],
  modelPath: args[1],
})
  .then((output) => console.log(JSON.stringify(output)))
  .catch(console.error);
