import { ValidDays } from "../inputs/ValidDays.ts";
import { PuzzlePart } from "../inputs/PuzzlePart.ts";

export class PuzzleIO {
  static readSampleInput(day: ValidDays, part: PuzzlePart): string {
    return Deno.readTextFileSync(`./inputs/${day}/${part}-sample.txt`);
  }

  static readSmallInput(day: ValidDays, part: PuzzlePart): string {
    return Deno.readTextFileSync(`./inputs/${day}/${part}-small.txt`);
  }

  static readInput(day: ValidDays, part: PuzzlePart): string {
    return Deno.readTextFileSync(`./inputs/${day}/${part}-input.txt`);
  }

  static splitLines(input: string): string[] {
    return input.split("\n");
  }

  static writeOutput(
    day: ValidDays,
    part: PuzzlePart,
    isSample: boolean,
    isSmall: boolean,
    output: string,
  ): void {
    const outputDir =
      `./outputs/${day}/${part}/${(this.getOutputDir(isSample, isSmall))}`;
    try {
      Deno.mkdirSync(outputDir, { recursive: true });
    } catch (err) {
      if (err instanceof Deno.errors.AlreadyExists) {
        // ignore
      } else {
        throw err;
      }
    }
    const outputFileName = this.getOutputTextFileName(isSample, isSmall);
    const outputPath = `${outputDir}/${outputFileName}`;
    Deno.writeTextFileSync(outputPath, output);
  }

  private static getOutputDir(isSample: boolean, isSmall: boolean) {
    if (isSmall) {
      return "small";
    }
    if (isSample) {
      return "sample";
    }
    return "actual";
  }

  private static getOutputTextFileName(isSample: boolean, isSmall: boolean) {
    if (isSample || isSmall) {
      return "output.txt";
    }
    return `output-${new Date().toISOString()}.txt`;
  }
}
