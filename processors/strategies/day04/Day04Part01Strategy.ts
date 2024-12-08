// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";
import { IStrategy } from "../../PuzzleProcessor.ts";
import { Matrix } from "../../../structures/Matrix.ts";

export class Day04Part01Strategy implements IStrategy {
  execute(input: string): string {
    const lines = PuzzleIO.splitLines(input);
    const matrix = new Matrix(lines.map((line) => {
      return line.split("");
    }));
    console.log(matrix);
    console.log("Matrix is square:", matrix.isSquare);

    let xmasMatches = 0;
    const xmasMatcher = /XMAS/g;

    for (const row of matrix.rows) {
      const plusMirror = row.join("") + row.toReversed().join("");
      const matches = plusMirror.match(xmasMatcher);
      const numMatches = matches?.length || 0;
      console.debug(
        `Num matches horizontal row ${row.join("")}:\n\t${numMatches}`,
      );
      xmasMatches += numMatches;
    }

    for (const column of matrix.columns) {
      const plusMirror = column.join("") + column.toReversed().join("");
      const matches = plusMirror.match(xmasMatcher);
      const numMatches = matches?.length || 0;
      console.debug(
        `Num matches vertical column ${column.join("")}:\n\t${numMatches}`,
      );
      xmasMatches += numMatches;
    }

    for (const diagonal of matrix.diagonals) {
      const plusMirror = diagonal.join("") + diagonal.toReversed().join("");
      const matches = plusMirror.match(xmasMatcher);
      const numMatches = matches?.length || 0;
      console.debug(
        `Num matches diagonal ${diagonal.join("")}:\n\t${numMatches}`,
      );
      xmasMatches += numMatches;
    }

    // Flip matrix horizontally and vertically and run on diagonals again
    const transposed = matrix.mirrorHorizontally();
    for (const diagonal of transposed.diagonals) {
      const plusMirror = diagonal.join("") + diagonal.toReversed().join("");
      const matches = plusMirror.match(xmasMatcher);
      const numMatches = matches?.length || 0;
      console.debug(
        `Num matches (transposed) diagonal ${
          diagonal.join("")
        }:\n\t${numMatches}`,
      );
      xmasMatches += numMatches;
    }

    console.log("Total XMAS matches:", xmasMatches);
    return xmasMatches.toString();
  }
}
