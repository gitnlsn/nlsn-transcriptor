import { execPromise } from './execPromise';

interface ConvertWavProps {
  filePath: string;
  outfilePath: string;
}

export const convertWav = async ({
  filePath,
  outfilePath,
}: ConvertWavProps) => {
  return await execPromise(`ffmpeg -y -i ${filePath} -ar 16000 ${outfilePath}`);
};
