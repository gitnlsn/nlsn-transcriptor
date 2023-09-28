export const parseSecondsIntoTime = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor(duration / 60) % 60;
  const seconds = duration % 60;

  return [hours, minutes, seconds]
    .map((number) =>
      number.toLocaleString('en-US', { minimumIntegerDigits: 2 }),
    )
    .join(':');
};
