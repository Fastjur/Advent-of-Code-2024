import { IStrategy } from "../../PuzzleProcessor.ts";
// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";

export class Day03Part01Strategy implements IStrategy {
  execute(input: string): string {
    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
    const allMatches = input.matchAll(mulRegex);
    let total = 0;
    for (const match of allMatches) {
      let firstNum = parseInt(match[1]);
      let secondNum = parseInt(match[2]);
      if (_.isNaN(firstNum) || _.isNaN(secondNum)) {
        console.warn(`Matched a NaN ${match[0]}, ${firstNum}, ${secondNum}`);
      }
      total += firstNum * secondNum;
    }
    console.log(total);
    return total.toString();
  }
}
