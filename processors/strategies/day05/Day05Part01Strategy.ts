// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";

import { IStrategy } from "../../PuzzleProcessor.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";

class PageOrderingRule {
  constructor(
    public readonly from: number,
    public readonly to: number,
    public toHasBeenVisited: boolean = false,
  ) {
  }
}

export class Day05Part01Strategy implements IStrategy {
  execute(input: string): Promise<string> {
    const lines = PuzzleIO.splitLines(input);
    const partSplitIdx = lines.indexOf("");
    const pageOrderingRules = lines.slice(0, partSplitIdx).map((line) => {
      const pages = line.split("|");
      return new PageOrderingRule(parseInt(pages[0]), parseInt(pages[1]));
    });
    const updates = lines.slice(partSplitIdx + 1).map((line) =>
      line.split(",").map((i) => parseInt(i))
    );
    console.log(pageOrderingRules);
    console.log(updates);

    const validUpdates: Array<number[]> = [];
    for (const update of updates) {
      console.log(`Processing update ${update}`);
      let isSafe = true;
      for (const page of update) {
        const visited = this.getVisitedPageOrderingRules(pageOrderingRules);
        const violatingRules = this.getPageOrderingRulesFrom(visited, page);
        if (violatingRules.length > 0) {
          console.warn(
            `Update ${update} violates rule(s):`,
            violatingRules,
          );
          isSafe = false;
          break;
        }
        const rulesTo = this.getPageOrderingRulesTo(pageOrderingRules, page);
        for (const rule of rulesTo) {
          rule.toHasBeenVisited = true;
        }
      }
      if (isSafe) {
        console.log("Update seems safe!");
        validUpdates.push(update);
      }
      for (const rule of pageOrderingRules) {
        rule.toHasBeenVisited = false;
      }
    }

    console.log("Valid updates:");
    const middleNumbers: number[] = [];
    for (const update of validUpdates) {
      console.log(update);
      middleNumbers.push(update[Math.floor(update.length / 2)]);
    }
    console.log("Middle numbers:", middleNumbers);
    const summed = _.sum(middleNumbers);
    console.log("Summed:", summed);
    return Promise.resolve(summed.toString());
  }

  private getVisitedPageOrderingRules(rules: PageOrderingRule[]) {
    return rules.filter((rule) => rule.toHasBeenVisited);
  }

  private getUnvisitedPageOrderingRules(rules: PageOrderingRule[]) {
    return rules.filter((rule) => !rule.toHasBeenVisited);
  }

  private getPageOrderingRulesFrom(rules: PageOrderingRule[], from: number) {
    return rules.filter((rule) => rule.from === from);
  }

  private getPageOrderingRulesTo(rules: PageOrderingRule[], to: number) {
    return rules.filter((rule) => rule.to === to);
  }
}
