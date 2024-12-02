import { IStrategy } from "../../PuzzleProcessor.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";
// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";

export class Day01Part01Strategy implements IStrategy {
  execute(input: string): string {
    const lines = PuzzleIO.splitLines(input).map((line) =>
      line.split(/\W+/).map((num) => parseInt(num))
    );
    const firstColumn = lines.map((line) => line[0]).sort((a, b) => a - b);
    const secondColumn = lines.map((line) => line[1]).sort((a, b) => a - b);
    const distances = firstColumn.map((num, index) =>
      Math.abs(num - secondColumn[index])
    );
    const sum = _.sum(distances);
    console.log(sum);
    return sum.toString();
  }
}
