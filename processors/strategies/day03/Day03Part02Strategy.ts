// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";
import { IStrategy } from "../../PuzzleProcessor.ts";

export class Day03Part02Strategy implements IStrategy {
  execute(input: string): Promise<string> {
    const doRegex = /do(?!n)/gmd;
    const dontRegex = /don't/gmd;
    const allDoMatches = input.matchAll(doRegex);
    const allDontMatches = input.matchAll(dontRegex);
    const doIndices = this.getIndices(allDoMatches);
    const dontIndices = this.getIndices(allDontMatches);

    doIndices.unshift(0); // Allow multiplying from start
    let canMultiply = true;

    const doDontMap: boolean[] = [];
    for (let i = 0; i < input.length; i++) {
      if (doIndices.includes(i)) {
        canMultiply = true;
      } else if (dontIndices.includes(i)) {
        canMultiply = false;
      }
      doDontMap[i] = canMultiply;
    }

    const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gmd;
    const allMatches = input.matchAll(mulRegex);

    let total = 0;
    for (const match of allMatches) {
      const mulIndex = match.indices![0][1];
      if (!doDontMap[mulIndex]) {
        continue;
      }
      const firstNum = parseInt(match[1]);
      const secondNum = parseInt(match[2]);
      if (_.isNaN(firstNum) || _.isNaN(secondNum)) {
        console.warn(`Matched a NaN ${match[0]}, ${firstNum}, ${secondNum}`);
      }
      total += firstNum * secondNum;
    }
    console.log(total);
    return Promise.resolve(total.toString());
  }

  private getIndices(
    allDoMatches: IterableIterator<RegExpExecArray>,
  ): number[] {
    const doIndices: number[] = [];
    for (const match of allDoMatches) {
      if (match.indices !== undefined) {
        doIndices.push(match.indices[0][1]);
      }
    }
    doIndices.sort((a, b) => a - b);
    return doIndices;
  }
}
