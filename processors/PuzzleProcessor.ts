import { ValidDays } from "../inputs/ValidDays.ts";
import { PuzzlePart } from "../inputs/PuzzlePart.ts";
import { Day01Part01Strategy } from "./strategies/day01/Day01Part01Strategy.ts";
import { Day01Part02Strategy } from "./strategies/day01/Day01Part02Strategy.ts";
import { Day02Part01Strategy } from "./strategies/day02/Day02Part01Strategy.ts";
import { Day02Part02Strategy } from "./strategies/day02/Day02Part02Strategy.ts";

export interface IPuzzleProcessor {
  process(day: ValidDays, part: PuzzlePart, input: string): string;
}

export interface IStrategy {
  execute(input: string): string;
}

export class PuzzleProcessor implements IPuzzleProcessor {
  process(day: ValidDays, part: PuzzlePart, input: string): string {
    const strategy = this.getStrategy(day, part);
    return strategy.execute(input);
  }

  private getStrategy(day: ValidDays, part: PuzzlePart): IStrategy {
    switch (day) {
      case ValidDays.DAY_01:
        return part === PuzzlePart.PART_01
          ? new Day01Part01Strategy()
          : new Day01Part02Strategy();
      case ValidDays.DAY_02:
        return part === PuzzlePart.PART_01
          ? new Day02Part01Strategy()
          : new Day02Part02Strategy();
      default:
        throw new Error(`Strategy not implemented for day: ${day}`);
    }
  }
}
