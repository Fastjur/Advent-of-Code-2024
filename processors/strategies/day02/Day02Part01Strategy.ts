import { IStrategy } from "../../PuzzleProcessor.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";

export class Day02Part01Strategy implements IStrategy {
  execute(input: string): Promise<string> {
    const reports = PuzzleIO.splitLines(input);
    let safeReports = 0;
    for (const report of reports) {
      let previousLevel = -1;
      let safe = true;
      let levelChange: "increasing" | "decreasing" | null = null;
      for (const level of report.split(" ").map((num) => parseInt(num))) {
        if (previousLevel === -1) {
          previousLevel = level;
          continue;
        }
        const diff = Math.abs(level - previousLevel);
        if (diff < 1 || diff > 3) {
          safe = false;
          break;
        }
        if (level - previousLevel > 0) {
          if (levelChange !== null && levelChange === "decreasing") {
            safe = false;
            break;
          }
          levelChange = "increasing";
        }
        if (level - previousLevel < 0) {
          if (levelChange !== null && levelChange === "increasing") {
            safe = false;
            break;
          }
          levelChange = "decreasing";
        }
        previousLevel = level;
      }
      if (safe) {
        safeReports++;
      }
    }
    console.log(safeReports);
    return Promise.resolve(safeReports.toString());
  }
}
