export enum PuzzlePart {
  PART_01 = "part01",
  PART_02 = "part02",
}

export function isValidPart(part: string): part is PuzzlePart {
  return Object.values(PuzzlePart).includes(part as PuzzlePart);
}

export function getPart(part: string): PuzzlePart {
  if (!isValidPart(part)) {
    throw new Error(
      `Invalid part: ${part}. Possible values are: ${
        Object.values(PuzzlePart).join(", ")
      }`,
    );
  }

  return part as PuzzlePart;
}
