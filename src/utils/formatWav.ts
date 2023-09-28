import { basename, dirname, extname, join } from 'path';

interface FormatWavProps {
  filePath: string;
}

export const formatWav = ({ filePath }: FormatWavProps) => {
  const extension = extname(filePath);
  const filename = basename(filePath, extension);
  const dirPath = dirname(filePath);

  return join(dirPath, `${filename}.wav`);
};
