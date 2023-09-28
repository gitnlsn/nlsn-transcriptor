import { execPromise } from './execPromise';
import { parseSecondsIntoTime } from './parseSecondsIntoTime';

interface SegmentationProps {
  filePath: string;
  outfilePath: string;

  start: number; // seconds
  length: number; // seconds
}

export const segmentation = async ({
  filePath,
  outfilePath,

  start,
  length,
}: SegmentationProps) => {
  const parsedStart = parseSecondsIntoTime(start);
  const parsedEnd = parseSecondsIntoTime(start + length);

  return await execPromise(
    `ffmpeg -i ${filePath} -ss ${parsedStart} -to ${parsedEnd} -ar 16000 ${outfilePath}`,
  );
};
