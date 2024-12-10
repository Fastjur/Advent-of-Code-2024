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

export class Day05Part02Strategy implements IStrategy {
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
    const invalidUpdates: Array<number[]> = [];
    for (const update of updates) {
      // console.log(`Processing update ${update}`);
      const isValid = this.isValidUpdate(update, pageOrderingRules);
      if (isValid) {
        // console.log("Update seems safe!");
        validUpdates.push(update);
      } else {
        invalidUpdates.push(update);
      }
    }

    console.log("Valid updates:");
    for (const update of validUpdates) {
      console.log(update);
    }

    console.log("\n\n\nInvalid updates:");
    const fixedUpdates: Array<number[]> = [];
    for (const update of invalidUpdates) {
      console.log("\n\n============\n", update);
      let isValid = false;
      while (!isValid) {
        for (const rule of pageOrderingRules) {
          if (!this.ruleAppliesToUpdate(rule, update)) {
            continue;
          }
          const ruleFromIndex = update.indexOf(rule.from);
          const ruleToIndex = update.indexOf(rule.to);
          if (ruleFromIndex === -1 || ruleToIndex === -1) {
            throw new Error(
              `Violation, rule from and to should be found ${rule}, ${update}`,
            );
          }
          if (ruleFromIndex > ruleToIndex) {
            console.warn(
              `${rule.from} and ${rule.to} swapped`,
            );
            const temp = update[ruleFromIndex];
            update[ruleFromIndex] = update[ruleToIndex];
            update[ruleToIndex] = temp;
            console.log("New state:", update);
            break;
          }
        }
        isValid = this.isValidUpdate(update, pageOrderingRules);
      }
      fixedUpdates.push(update);
    }

    // TODO
    const middleNumbers: number[] = [];
    console.log("Fixed updates:");
    for (const update of fixedUpdates) {
      console.log(update);
      middleNumbers.push(update[Math.floor(update.length / 2)]);
    }
    console.log("Middle numbers:", middleNumbers);
    const summed = _.sum(middleNumbers);
    console.log("Summed:", summed);
    return Promise.resolve(summed.toString());
  }

  private isValidUpdate(
    update: number[],
    pageOrderingRules: PageOrderingRule[],
  ) {
    for (const rule of pageOrderingRules) {
      rule.toHasBeenVisited = false;
    }

    let isSafe = true;
    for (const page of update) {
      const visited = this.getVisitedPageOrderingRules(pageOrderingRules);
      const violatingRules = this.getPageOrderingRulesFrom(visited, page);
      if (violatingRules.length > 0) {
        isSafe = false;
        break;
      }
      const rulesTo = this.getPageOrderingRulesTo(pageOrderingRules, page);
      for (const rule of rulesTo) {
        rule.toHasBeenVisited = true;
      }
    }
    return isSafe;
  }

  private ruleAppliesToUpdate(rule: PageOrderingRule, update: number[]) {
    return update.includes(rule.from) && update.includes(rule.to);
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
