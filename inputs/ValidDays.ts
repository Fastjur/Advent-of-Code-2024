export enum ValidDays {
  DAY_01 = "day01",
  DAY_02 = "day02",
  DAY_03 = "day03",
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
