import { ValidDays } from "../inputs/ValidDays.ts";
import { PuzzlePart } from "../inputs/PuzzlePart.ts";
import { Day01Part01Strategy } from "./strategies/day01/Day01Part01Strategy.ts";
import { Day01Part02Strategy } from "./strategies/day01/Day01Part02Strategy.ts";
import { Day02Part01Strategy } from "./strategies/day02/Day02Part01Strategy.ts";
import { Day02Part02Strategy } from "./strategies/day02/Day02Part02Strategy.ts";
import { Day03Part01Strategy } from "./strategies/day03/Day03Part01Strategy.ts";
import { Day03Part02Strategy } from "./strategies/day03/Day03Part02Strategy.ts";
import { Day04Part01Strategy } from "./strategies/day04/Day04Part01Strategy.ts";
import { Day04Part02Strategy } from "./strategies/day04/Day04Part02Strategy.ts";
import { Day05Part01Strategy } from "./strategies/day05/Day05Part01Strategy.ts";
import { Day05Part02Strategy } from "./strategies/day05/Day05Part02Strategy.ts";
import { Day06Part01Strategy } from "./strategies/day06/Day06Part01Strategy.ts";
import { Day06Part02Strategy } from "./strategies/day06/Day06Part02Strategy.ts";
import { ConsoleLogger, ILogger } from "../utils/Logger.ts";

export interface IPuzzleProcessor {
  process(day: ValidDays, part: PuzzlePart, input: string): Promise<string>;
}

export interface IStrategy {
  execute(input: string): Promise<string>;
}

export class PuzzleProcessor implements IPuzzleProcessor {
  constructor(private readonly logger: ILogger) {
  }

  process(
    day: ValidDays,
    part: PuzzlePart,
    input: string,
  ): Promise<string> {
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
      case ValidDays.DAY_03:
        return part === PuzzlePart.PART_01
          ? new Day03Part01Strategy()
          : new Day03Part02Strategy();
      case ValidDays.DAY_04:
        return part === PuzzlePart.PART_01
          ? new Day04Part01Strategy()
          : new Day04Part02Strategy();
      case ValidDays.DAY_05:
        return part === PuzzlePart.PART_01
          ? new Day05Part01Strategy()
          : new Day05Part02Strategy();
      case ValidDays.DAY_06:
        return part === PuzzlePart.PART_01
          ? new Day06Part01Strategy(this.logger)
          : new Day06Part02Strategy();
      default:
        throw new Error(`Strategy not implemented for day: ${day}`);
    }
  }
}
