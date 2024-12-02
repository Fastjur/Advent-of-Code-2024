import { IStrategy } from "../../PuzzleProcessor.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";

export class Day02Part02Strategy implements IStrategy {
  execute(input: string): string {
    const reports = PuzzleIO.splitLines(input);
    let safeReports = 0;
    for (const report of reports) {
      let previousLevel = -1;
      let unsafeLevels = 0;
      let levelChange: "increasing" | "decreasing" | null = null;
      for (const level of report.split(" ").map((num) => parseInt(num))) {
        if (previousLevel === -1) {
          previousLevel = level;
          continue;
        }
        const diff = Math.abs(level - previousLevel);
        if (diff < 1 || diff > 3) {
          unsafeLevels++;
          if (unsafeLevels >= 2) {
            break;
          }
        }
        if (level - previousLevel > 0) {
          if (levelChange !== null && levelChange === "decreasing") {
            unsafeLevels++;
            if (unsafeLevels >= 2) {
              break;
            }
          }
          levelChange = "increasing";
        }
        if (level - previousLevel < 0) {
          if (levelChange !== null && levelChange === "increasing") {
            unsafeLevels++;
            if (unsafeLevels >= 2) {
              break;
            }
          }
          levelChange = "decreasing";
        }
        previousLevel = level;
      }
      if (unsafeLevels <= 1) {
        safeReports++;
      }
    }
    console.log(safeReports);
    return safeReports.toString();
  }
}
