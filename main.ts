import { getDay, ValidDays } from "./inputs/ValidDays.ts";
import { PuzzleIO } from "./utils/PuzzleIO.ts";
import { PuzzleProcessor } from "./processors/PuzzleProcessor.ts";
import { getPart, PuzzlePart } from "./inputs/PuzzlePart.ts";
import { ConsoleLogger } from "./utils/Logger.ts";

function getInput(
  day: ValidDays,
  part: PuzzlePart,
  useSample: boolean,
  useSmall: boolean,
) {
  if (useSmall) {
    console.log("Using small input!");
    return PuzzleIO.readSmallInput(day, part);
  }
  if (useSample) {
    console.log("Using sample input!");
    return PuzzleIO.readSampleInput(day, part);
  }
  console.log("Reading the real input!");
  return PuzzleIO.readInput(day, part);
}

if (import.meta.main) {
  const day = getDay(Deno.args[0]);
  const part = getPart(Deno.args[1]);

  const useSample = Deno.args[2] === "sample";
  const useSmall = Deno.args[2] === "small";

  const input = getInput(day, part, useSample, useSmall);

  const processor = new PuzzleProcessor(new ConsoleLogger(useSample));
  console.time("Execution time");
  const result = await processor.process(day, part, input);
  console.log("\n\n==== RESULT ====");
  console.log(result);
  console.log("==== END ====\n");
  console.timeEnd("Execution time");
  PuzzleIO.writeOutput(day, part, useSample, useSmall, result);
}
