import { basename, dirname, extname, join } from 'path';

interface TranscriptionProps {
  filePath: string;
}

export const formatTranscription = ({ filePath }: TranscriptionProps) => {
  const extension = extname(filePath);
  const filename = basename(filePath, extension);
  const dirPath = dirname(filePath);

  return join(dirPath, `${filename}`);
};
