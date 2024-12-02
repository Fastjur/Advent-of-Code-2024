import { getDay } from "./inputs/ValidDays.ts";
import { PuzzleIO } from "./utils/PuzzleIO.ts";
import { PuzzleProcessor } from "./processors/PuzzleProcessor.ts";
import { getPart } from "./inputs/PuzzlePart.ts";

if (import.meta.main) {
  const day = getDay(Deno.args[0]);
  const part = getPart(Deno.args[1]);

  const useSample = Deno.args[2] === "sample";

  const input = useSample
    ? PuzzleIO.readSampleInput(day, part)
    : PuzzleIO.readInput(day, part);
  const processor = new PuzzleProcessor();
  const result = processor.process(day, part, input);
  PuzzleIO.writeOutput(day, part, useSample, result);
}
