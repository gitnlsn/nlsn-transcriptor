import { convertTimeToSeconds } from './convertTimeToSeconds';
import { execPromise } from './execPromise';

interface GetAudioDurationProps {
  filePath: string;
}

export const getAudioDuration = async ({ filePath }: GetAudioDurationProps) => {
  return await execPromise(
    `ffprobe -i ${filePath} 2>&1 | grep -Pio 'Duration: ([0-9]{2}):([0-9]{2}):([0-9]{2})' | cut -d ' ' -f 2`,
  ).then(({ stdout }) => {
    return convertTimeToSeconds(stdout);
  });
};
