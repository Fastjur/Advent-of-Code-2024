export enum Operator {
  ADD = "+",
  MULTIPLY = "*",
  CONCATENATE = "||",
}
export type EquationNumber = number;

export function isOperator(value: unknown): value is Operator {
  return value === Operator.ADD || value === Operator.MULTIPLY ||
    value === Operator.CONCATENATE;
}

export function isEquationNumber(value: unknown): value is EquationNumber {
  return typeof value === "number";
}

export function getOperatorCombinations(
  operators: Operator[],
  numOfNumbers: number,
): Operator[][] {
  const totalCombinations = Math.pow(operators.length, numOfNumbers - 1);
  const combinations: Operator[][] = [];
  for (let i = 0; i < totalCombinations; i++) {
    const combination: Operator[] = [];
    let quotient = i;
    for (let j = 0; j < numOfNumbers - 1; j++) {
      const remainder = quotient % operators.length;
      quotient = Math.floor(quotient / operators.length);
      combination.push(operators[remainder]);
    }
    combinations.push(combination);
  }
  return combinations;
}

export class Equation {
  constructor(
    public readonly testValue: number,
    public readonly equationArray: (Operator | EquationNumber)[],
  ) {
  }

  public static createEquation(
    testValue: string,
    numbers: number[],
    operators: Operator[],
  ) {
    const newNumbers: (Operator | EquationNumber)[] = [];
    for (let i = 0; i < numbers.length; i++) {
      newNumbers.push(numbers[i]);
      if (i < operators.length) {
        newNumbers.push(operators[i]);
      }
    }
    return new Equation(parseInt(testValue), newNumbers);
  }

  public toString(): string {
    return `${this.testValue} = ${this.equationArray.join(" ")}`;
  }

  public calculate(): number {
    let result = 0;
    let previous: EquationNumber | Operator | null = null;
    for (const numberOrOperator of this.equationArray) {
      if (isEquationNumber(numberOrOperator)) {
        if (previous === null) {
          result = numberOrOperator;
          continue;
        }
        if (isOperator(previous)) {
          if (previous === Operator.ADD) {
            result += numberOrOperator;
          } else if (previous === Operator.MULTIPLY) {
            result *= numberOrOperator;
          } else if (previous === Operator.CONCATENATE) {
            result = parseInt(`${result}${numberOrOperator}`);
          } else {
            throw new Error(`Invalid operator: ${previous}`);
          }
        }
      }
      previous = numberOrOperator;
    }
    return result;
  }

  public isCorrect(): boolean {
    return this.calculate() === this.testValue;
  }
}
