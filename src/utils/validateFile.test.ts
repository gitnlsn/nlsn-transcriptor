import { validateFile } from './validateFile';

describe('validateFile', () => {
  it('should validate mp3 file', async () => {
    const validFile = await validateFile({ filePath: './assets/sample.m4a' });

    expect(validFile).toBe(true);
  });

  it('should not validate txt file', async () => {
    const validFile = await validateFile({ filePath: './assets/readme.txt' });

    expect(validFile).toBe(false);
  });
});
