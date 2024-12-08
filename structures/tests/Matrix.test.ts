import { expect } from "jsr:@std/expect";

// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";
import { Matrix } from "../Matrix.ts";

Deno.test("MatrixTest", async (t) => {
  const defaultMatrix = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];

  const nonSquareMatrix = [
    ["a", "b", "c"],
    ["d", "e", "f"],
  ];

  await t.step("Matrix creation with default data", () => {
    const data = _.cloneDeep(defaultMatrix);
    const matrix = new Matrix(data);
    expect(matrix.numRows).toBe(3);
    expect(matrix.numColumns).toBe(3);
    expect(matrix.isSquare).toBe(true);
    expect(matrix.get(0, 0)).toBe("a");
    expect(matrix.get(1, 1)).toBe("e");
    expect(matrix.get(2, 2)).toBe("i");
  });

  await t.step("Matrix creation with non-square data", () => {
    const matrix = new Matrix(_.cloneDeep(nonSquareMatrix));
    expect(matrix.numRows).toBe(2);
    expect(matrix.numColumns).toBe(3);
    expect(matrix.isSquare).toBe(false);
    expect(matrix.get(0, 0)).toBe("a");
    expect(matrix.get(1, 1)).toBe("e");
  });

  await t.step("Matrix creation with empty data", () => {
    expect(() => new Matrix([])).toThrow("Matrix must have at least one row");
  });

  await t.step(
    "Should throw an error if rows have different number of columns",
    () => {
      const data = [
        ["a", "b", "c"],
        ["d", "e"],
      ];
      expect(() => new Matrix(data)).toThrow(
        "All rows must have the same number of columns!",
      );
    },
  );

  await t.step("Should return the rows iterator", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    const rows = Array.from(matrix.rows);
    expect(rows).toEqual(defaultMatrix);
  });

  await t.step("Should return the columns iterator", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    const columns = Array.from(matrix.columns);
    expect(columns).toEqual([
      ["a", "d", "g"],
      ["b", "e", "h"],
      ["c", "f", "i"],
    ]);
  });

  await t.step("Should return the diagonals iterator", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    const diagonals = Array.from(matrix.diagonals);
    expect(diagonals).toEqual([
      { startingRow: 2, startingColumn: 0, diagonal: ["g"] },
      { startingRow: 1, startingColumn: 0, diagonal: ["d", "h"] },
      { startingRow: 0, startingColumn: 0, diagonal: ["a", "e", "i"] },
      { startingRow: 0, startingColumn: 1, diagonal: ["b", "f"] },
      { startingRow: 0, startingColumn: 2, diagonal: ["c"] },
    ]);
  });

  await t.step("Should get the correct value at a specific position", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    expect(matrix.get(0, 0)).toBe("a");
    expect(matrix.get(1, 1)).toBe("e");
    expect(matrix.get(2, 2)).toBe("i");
    expect(matrix.get(0, 2)).toBe("c");
    expect(matrix.get(2, 0)).toBe("g");

    expect(() => matrix.get(3, 0)).toThrow("Row index out of bounds!");
    expect(() => matrix.get(0, 3)).toThrow("Column index out of bounds!");
  });

  await t.step("Should set the correct value at a specific position", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    matrix.set(0, 0, "z");
    matrix.set(1, 1, "y");
    matrix.set(2, 2, "x");
    expect(matrix.get(0, 0)).toBe("z");
    expect(matrix.get(1, 1)).toBe("y");
    expect(matrix.get(2, 2)).toBe("x");
  });

  await t.step("Should get the correct row", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    expect(matrix.getRow(0)).toEqual(["a", "b", "c"]);
    expect(matrix.getRow(1)).toEqual(["d", "e", "f"]);
    expect(matrix.getRow(2)).toEqual(["g", "h", "i"]);
  });

  await t.step("Should get the correct column", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    expect(matrix.getColumn(0)).toEqual(["a", "d", "g"]);
    expect(matrix.getColumn(1)).toEqual(["b", "e", "h"]);
    expect(matrix.getColumn(2)).toEqual(["c", "f", "i"]);
  });

  await t.step("Should get the correct diagonal", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    expect(matrix.getDiagonal(0, 0)).toEqual({
      startingRow: 0,
      startingColumn: 0,
      diagonal: ["a", "e", "i"],
    });
    expect(matrix.getDiagonal(1, 1)).toEqual({
      startingRow: 1,
      startingColumn: 1,
      diagonal: ["e", "i"],
    });
    expect(matrix.getDiagonal(0, 1)).toEqual({
      startingRow: 0,
      startingColumn: 1,
      diagonal: ["b", "f"],
    });
    expect(matrix.getDiagonal(1, 0)).toEqual({
      startingRow: 1,
      startingColumn: 0,
      diagonal: ["d", "h"],
    });
    expect(matrix.getDiagonal(0, 2)).toEqual({
      startingRow: 0,
      startingColumn: 2,
      diagonal: ["c"],
    });
    expect(matrix.getDiagonal(2, 0)).toEqual({
      startingRow: 2,
      startingColumn: 0,
      diagonal: ["g"],
    });
  });

  await t.step("Should transpose the square matrix", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    const transposed = matrix.transpose();
    expect(transposed.numRows).toBe(3);
    expect(transposed.numColumns).toBe(3);
    expect(transposed.isSquare).toBe(true);

    expect(transposed.getRow(0)).toEqual(["a", "d", "g"]);
    expect(transposed.getRow(1)).toEqual(["b", "e", "h"]);
    expect(transposed.getRow(2)).toEqual(["c", "f", "i"]);
  });

  await t.step("Should transpose the non-square matrix", () => {
    const matrix = new Matrix(_.cloneDeep(nonSquareMatrix));
    const transposed = matrix.transpose();
    expect(transposed.numRows).toBe(3);
    expect(transposed.numColumns).toBe(2);
    expect(transposed.isSquare).toBe(false);

    expect(transposed.getRow(0)).toEqual(["a", "d"]);
    expect(transposed.getRow(1)).toEqual(["b", "e"]);
    expect(transposed.getRow(2)).toEqual(["c", "f"]);
  });

  await t.step("Should mirror the matrix horizontally", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    const mirrored = matrix.mirrorHorizontally();
    expect(mirrored.getRow(0)).toEqual(["c", "b", "a"]);
    expect(mirrored.getRow(1)).toEqual(["f", "e", "d"]);
    expect(mirrored.getRow(2)).toEqual(["i", "h", "g"]);
  });

  await t.step("Should mirror the matrix vertically", () => {
    const matrix = new Matrix(_.cloneDeep(defaultMatrix));
    const mirrored = matrix.mirrorVertically();
    expect(mirrored.getRow(0)).toEqual(["g", "h", "i"]);
    expect(mirrored.getRow(1)).toEqual(["d", "e", "f"]);
    expect(mirrored.getRow(2)).toEqual(["a", "b", "c"]);
  });

  await t.step("Should create a matrix of a specific size", () => {
    const matrix = Matrix.ofSize(3, 3, "a");
    expect(matrix.numRows).toBe(3);
    expect(matrix.numColumns).toBe(3);
    expect(matrix.isSquare).toBe(true);
    expect(matrix.get(0, 0)).toBe("a");
    expect(matrix.get(2, 2)).toBe("a");
    expect(matrix.get(1, 0)).toBe("a");
  });
});
