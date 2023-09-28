import { basename, dirname, extname } from 'path';

export const getPathMetadata = (filePath: string) => {
  const extension = extname(filePath);
  const filename = basename(filePath, extension);
  const dirPath = dirname(filePath);

  return {
    extension,
    filename,
    dirPath,
  };
};
