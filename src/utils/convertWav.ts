import { execPromise } from './execPromise';

interface ConvertWavProps {
  filePath: string;
  outfilePath: string;
}

export const convertWav = async ({
  filePath,
  outfilePath,
}: ConvertWavProps) => {
  return await execPromise(`ffmpeg -i ${filePath} -ar 16000 ${outfilePath}`);
};
