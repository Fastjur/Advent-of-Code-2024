import { IStrategy } from "../../PuzzleProcessor.ts";
import { PuzzleIO } from "../../../utils/PuzzleIO.ts";
import { Matrix } from "../../../structures/Matrix.ts";

export class Day04Part02Strategy implements IStrategy {
  execute(input: string): string {
    const lines = PuzzleIO.splitLines(input);
    const matrix = new Matrix(lines.map((line) => {
      return line.split("");
    }));
    const matrixWithMarks = new Matrix(lines.map((line) => {
      return line.split("");
    }));
    console.log(matrix);
    console.log("Matrix is square:", matrix.isSquare);

    const xmasMatcher = /(?=MAS)|(?=SAM)/gd;
    let xmasCount = 0;
    for (
      const diagonal of matrix.diagonals.map((diag) => {
        return {
          startingRow: diag.startingRow,
          startingColumn: diag.startingColumn,
          diagonal: diag.diagonal.join(""),
        };
      })
    ) {
      console.log(diagonal);
      const matches = diagonal.diagonal.matchAll(xmasMatcher);
      for (const match of matches) {
        console.log("Match:", match);
        const matchIndex = match.indices!.map((index) => index[0])[0];
        console.log("Match index:", matchIndex);
        const matchCoords = {
          row: diagonal.startingRow + matchIndex + 1,
          col: diagonal.startingColumn + matchIndex + 1,
        };
        console.log("Match coords:", matchCoords);
        const perpendicular = [
          matrix.get(matchCoords.row + 1, matchCoords.col - 1),
          matrix.get(matchCoords.row, matchCoords.col),
          matrix.get(matchCoords.row - 1, matchCoords.col + 1),
        ].join("");
        console.log("Perpendicular:", perpendicular);
        if (perpendicular.match(xmasMatcher)) {
          console.log("Found XMAS!");
          matrixWithMarks.set(matchCoords.row, matchCoords.col, "X");
          xmasCount++;
        }
      }
    }

    console.log(matrixWithMarks.rows.map((row) => row.join("")).join("\n"));

    console.log("XMAS count:", xmasCount);
    return xmasCount.toString();
  }
}
