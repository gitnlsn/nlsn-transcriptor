import { WhisperSpeech } from 'src/interfaces/whisper-speech';
import { execPromise } from './execPromise';
import { formatTranscription } from './formatTranscription';
import { Speech } from '../interfaces/speech';
import { convertTimeToSeconds } from './convertTimeToSeconds';

interface TranscribeProps {
  filePath: string;

  modelPath: string;
}

export const transcribe = async ({ filePath, modelPath }: TranscribeProps) => {
  const outputFilename = formatTranscription({ filePath });

  await execPromise(
    `/usr/bin/whisper-cpp -f ${filePath} -m ${modelPath} -l pt -bo 10 -p 2 -oj -of ${outputFilename}`,
  );

  const transcription = await execPromise(
    `jq '.transcription | .[] | { start: .timestamps.from, end: .timestamps.to, text: .text }' ${outputFilename}.json | jq -s --compact-output`,
  )
    .then(({ stdout }) => JSON.parse(stdout) as WhisperSpeech[])
    .then((speechList) =>
      speechList.map(({ start: startString, end: endString, text }) => {
        const start = convertTimeToSeconds(startString);
        const end = convertTimeToSeconds(endString);
        const duration = end - start;

        return {
          time: start,
          duration,
          text,
        } as Speech;
      }),
    );

  await execPromise(`rm ${outputFilename}.json`);

  return {
    transcription,
  };
};
