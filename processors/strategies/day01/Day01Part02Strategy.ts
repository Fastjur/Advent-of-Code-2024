import { IStrategy } from "../../PuzzleProcessor.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";
// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";

export class Day01Part02Strategy implements IStrategy {
  execute(input: string): Promise<string> {
    const lines = PuzzleIO.splitLines(input).map((line) =>
      line.split(/\W+/).map((num) => parseInt(num))
    );
    const firstColumn = lines.map((line) => line[0]);
    const secondColumn = lines.map((line) => line[1]);
    const appearances: Map<number, number> = new Map();

    let similarityScore = 0;
    for (let i = 0; i < firstColumn.length; i++) {
      const firstNumber = firstColumn[i];
      if (appearances.has(firstNumber)) {
        similarityScore += firstNumber * appearances.get(firstNumber)!;
        continue;
      }
      const appearancesInSecondColumn = secondColumn.filter((num) =>
        num === firstNumber
      ).length;
      appearances.set(firstNumber, appearancesInSecondColumn);
      similarityScore += firstNumber * appearancesInSecondColumn;
    }
    console.log(similarityScore);
    return Promise.resolve(similarityScore.toString());
  }
}
