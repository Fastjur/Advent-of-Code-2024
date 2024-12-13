export enum ValidDays {
  DAY_01 = "day01",
  DAY_02 = "day02",
  DAY_03 = "day03",
  DAY_04 = "day04",
  DAY_05 = "day05",
  DAY_06 = "day06",
  DAY_07 = "day07",
}

export function isValidDay(day: string): day is ValidDays {
  return Object.values(ValidDays).includes(day as ValidDays);
}

export function getDay(day: string): ValidDays {
  if (!isValidDay(day)) {
    throw new Error(
      `Invalid day: ${day}. Possible values are: ${
        Object.values(ValidDays).join(", ")
      }`,
    );
  }

  return day as ValidDays;
}
