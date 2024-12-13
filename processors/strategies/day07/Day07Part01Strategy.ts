import { IStrategy } from "../../PuzzleProcessor.ts";
import { ILogger } from "../../../utils/Logger.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";
import { Equation, getOperatorCombinations, Operator } from "./Equation.ts";

const OPERATORS = [Operator.ADD, Operator.MULTIPLY];

export class Day07Part01Strategy implements IStrategy {
  constructor(private readonly logger: ILogger) {
  }

  execute(input: string): Promise<string> {
    const lines = PuzzleIO.splitLines(input);
    const matcher = /(\d+): (.*)/;
    const correctEquations: Equation[] = [];
    for (const equation of lines) {
      const match = equation.match(matcher);
      if (match) {
        const [_, testValue, numberString] = match;
        this.logger.debug(`testValue: ${testValue}, : ${numberString}`);
        const numbers = numberString.split(" ").map((n) => parseInt(n));
        const operatorCombinations = getOperatorCombinations(
          OPERATORS,
          numbers.length,
        );
        this.logger.debug(operatorCombinations);
        for (const combination of operatorCombinations) {
          const equation = Equation.createEquation(
            testValue,
            numbers,
            combination,
          );
          const isCorrect = equation.isCorrect();
          this.logger.debug(equation.toString(), "is correct: ", isCorrect);
          if (isCorrect) {
            correctEquations.push(equation);
            break;
          }
        }
      } else {
        throw new Error(`Invalid equation: ${equation}`);
      }
    }

    this.logger.log("Correct equations");
    this.logger.log(correctEquations.map((e) => e.toString()).join("\n"));

    const totalSumOfCorrectEquations = correctEquations.reduce(
      (sum, equation) => sum + equation.testValue,
      0,
    );
    this.logger.log(
      `Total sum of correct equations: ${totalSumOfCorrectEquations}`,
    );
    return Promise.resolve(totalSumOfCorrectEquations.toString());
  }
}
