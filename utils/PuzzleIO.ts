import { ValidDays } from "../inputs/ValidDays.ts";
import { PuzzlePart } from "../inputs/PuzzlePart.ts";

export class PuzzleIO {
  static readSampleInput(day: ValidDays, part: PuzzlePart): string {
    return Deno.readTextFileSync(`./inputs/${day}/${part}-sample.txt`);
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
    output: string,
  ): void {
    const outputDir = `./outputs/${day}/${part}/${
      isSample ? "sample" : "actual"
    }`;
    try {
      Deno.mkdirSync(outputDir, { recursive: true });
    } catch (err) {
      if (err instanceof Deno.errors.AlreadyExists) {
        // ignore
      } else {
        throw err;
      }
    }
    const outputPath = isSample
      ? `${outputDir}/output.txt`
      : `${outputDir}/output-${new Date().toISOString()}.txt`;
    Deno.writeTextFileSync(outputPath, output);
  }
}
