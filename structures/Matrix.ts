// @ts-types="npm:@types/lodash"
import _ from "npm:lodash";

export interface MatrixDiagonal<T> {
  startingRow: number;
  startingColumn: number;
  diagonal: T[];
}

export interface IMatrix<T> {
  numRows: number;
  numColumns: number;
  isSquare: boolean;
  rows: T[][];
  columns: T[][];
  diagonals: MatrixDiagonal<T>[];
  get(row: number, col: number): T;
  set(row: number, col: number, value: T): void;
  getRow(row: number): T[];
  getColumn(col: number): T[];
  getDiagonal(row: number, col: number): MatrixDiagonal<T>;
  transpose(): IMatrix<T>;
  mirrorVertically(): IMatrix<T>;
  mirrorHorizontally(): IMatrix<T>;
  // TODO
  // rotateClockwise(): IMatrix<T>;
  // rotateCounterClockwise(): IMatrix<T>;
}

export class Matrix<T> implements IMatrix<T> {
  private readonly data: T[][];
  public readonly numRows: number;
  public readonly numColumns: number;
  public readonly isSquare: boolean;

  constructor(data: T[][]) {
    if (data.length === 0) {
      throw new Error("Matrix must have at least one row!");
    }
    this.numRows = data.length;
    this.numColumns = data[0].length;
    // Check that every row has the same number of columns
    if (!data.every((row) => row.length === data[0].length)) {
      throw new Error("All rows must have the same number of columns!");
    }
    this.isSquare = data.length === data[0].length;
    this.data = _.cloneDeep(data);
  }

  static ofSize<T>(
    rows: number,
    columns: number,
    value: T | undefined,
  ): Matrix<T | undefined> {
    const data = Array.from(
      { length: rows },
      () => Array.from({ length: columns }, () => value),
    );
    return new Matrix(data);
  }

  get rows(): T[][] {
    return this.data;
  }

  get columns(): T[][] {
    return this.data[0].map((_, i) => this.data.map((row) => row[i]));
  }

  get diagonals(): MatrixDiagonal<T>[] {
    if (!this.isSquare) {
      // TODO, for now we only support square matrices
      throw new Error("Matrix must be square to get its diagonals!");
    }
    const diagonals: MatrixDiagonal<T>[] = [];
    for (let i = 0; i < Math.min(this.numColumns, this.numRows); i++) {
      diagonals.push({
        startingRow: 0,
        startingColumn: i,
        diagonal: this.getDiagonal(0, i).diagonal,
      });
      if (i > 0) {
        diagonals.unshift({
          startingRow: i,
          startingColumn: 0,
          diagonal: this.getDiagonal(i, 0).diagonal,
        });
      }
    }
    return diagonals;
  }

  get(row: number, col: number): T {
    if (row >= this.numRows) {
      throw new Error("Row index out of bounds!");
    }
    if (col >= this.numColumns) {
      throw new Error("Column index out of bounds!");
    }
    return this.data[row][col];
  }

  set(row: number, col: number, value: T): void {
    this.data[row][col] = value;
  }

  getRow(row: number): T[] {
    return this.data[row];
  }

  getColumn(col: number): T[] {
    return this.data.map((row) => row[col]);
  }

  getDiagonal(row: number, col: number): MatrixDiagonal<T> {
    const diagonal = [];
    for (let i = 0; i < Math.min(this.numColumns, this.numRows); i++) {
      if (row + i >= this.numRows || col + i >= this.numColumns) {
        break;
      }
      diagonal.push(this.data[row + i][col + i]);
    }
    return {
      startingRow: row,
      startingColumn: col,
      diagonal,
    };
  }

  transpose(): Matrix<T> {
    const transposed = this.data[0].map((_, i) =>
      this.data.map((row) => row[i])
    );
    return new Matrix(transposed);
  }

  mirrorHorizontally(): Matrix<T> {
    return new Matrix(this.data.map((row) => row.slice().reverse()));
  }

  mirrorVertically(): IMatrix<T> {
    return new Matrix(this.data.slice().reverse());
  }
}
