import { getAudioDuration } from './getAudioDuration';

describe('getAudioDuration', () => {
  it('should get duration from sample', async () => {
    const duration = await getAudioDuration({
      filePath: './assets/sample.m4a',
    });

    expect(duration).toBe(30)
  });
});
