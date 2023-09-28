import { parseSecondsIntoTime } from './parseSecondsIntoTime';

describe('parseSecondsIntoTime', () => {
  it.each([
    [30, '00:00:30'],
    [60, '00:01:00'],
    [61, '00:01:01'],
    [121, '00:02:01'],
    [1800, '00:30:00'],
    [3600, '01:00:00'],
    [3601, '01:00:01'],
    [3661, '01:01:01'],
  ])('should parse seconds into formatted time: %s -> %s', (duration, expected) => {
    expect(parseSecondsIntoTime(duration)).toEqual(expected);
  });
});
