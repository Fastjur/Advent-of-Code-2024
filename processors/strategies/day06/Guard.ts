import { ILogger } from "../../../utils/Logger.ts";
import { MapNodeType, PatrolMap } from "./PatrolMap.ts";

export enum GuardDirection {
  UP = "^",
  DOWN = "v",
  LEFT = "<",
  RIGHT = ">",
}

export class AlreadyVisitedError implements Error {
  constructor(s: string) {
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = s;
    this.name = "AlreadyVisitedError";
  }

  message: string;
  name: string;
}

export class Guard {
  private _x: number;
  private _y: number;
  private _direction: GuardDirection;
  private visitedNodesAtDirections: Map<string, true>;
  public readonly map: PatrolMap;

  constructor(
    private readonly logger: ILogger,
    x: number,
    y: number,
    direction: GuardDirection,
    map: PatrolMap,
    visitedNodesAtDirections: Map<string, true>,
  ) {
    this._y = y;
    this._x = x;
    this._direction = direction;
    this.map = map;
    this.visitedNodesAtDirections = visitedNodesAtDirections;
  }

  toString(): string {
    return `Guard at (${this._y}, ${this._x}) facing ${this._direction}`;
  }

  get x(): number {
    return this._x;
  }

  get y(): number {
    return this._y;
  }

  get direction(): GuardDirection {
    return this._direction;
  }

  public getMapNodeTypeFromDirection(): MapNodeType {
    switch (this._direction) {
      case GuardDirection.UP:
        return MapNodeType.GuardUp;
      case GuardDirection.DOWN:
        return MapNodeType.GuardDown;
      case GuardDirection.LEFT:
        return MapNodeType.GuardLeft;
      case GuardDirection.RIGHT:
        return MapNodeType.GuardRight;
    }
  }

  public turnRight(): void {
    switch (this._direction) {
      case GuardDirection.UP:
        this._direction = GuardDirection.RIGHT;
        break;
      case GuardDirection.DOWN:
        this._direction = GuardDirection.LEFT;
        break;
      case GuardDirection.LEFT:
        this._direction = GuardDirection.UP;
        break;
      case GuardDirection.RIGHT:
        this._direction = GuardDirection.DOWN;
        break;
    }
  }

  private updateMapWithPosition(): void {
    this.map.setNode(this._x, this._y, this.getMapNodeTypeFromDirection());
  }

  private checkIfAlreadyVisited(
    x: number,
    y: number,
    direction: GuardDirection,
  ): void {
    const key = `${x},${y},${direction}`;
    this.logger.debug(`Checking if already visited ${key}`);
    if (this.visitedNodesAtDirections.has(key)) {
      throw new AlreadyVisitedError(`Already visited (${this._y}, ${this._x})`);
    }
    this.visitedNodesAtDirections.set(
      key,
      true,
    );
  }

  public walk(): void {
    let newX = this._x;
    let newY = this._y;
    this.logger.debug(
      `Walking from (${this._y}, ${this._x}) in direction ${this._direction}`,
    );
    switch (this._direction) {
      case GuardDirection.UP:
        newY--;
        break;
      case GuardDirection.DOWN:
        newY++;
        break;
      case GuardDirection.LEFT:
        newX--;
        break;
      case GuardDirection.RIGHT:
        newX++;
        break;
    }
    if (this.map.isOutOfBounds(newX, newY)) {
      this.logger.log(`Out of bounds at ${newY} ${newX}`);
      this.map.setNode(this._x, this._y, MapNodeType.Visited);
      this.map.guardWalkedOff = true;
    } else if (this.map.isObstructed(newX, newY)) {
      this.logger.debug(`Obstructed path at ${newY} ${newX}, turning right`);
      this.turnRight();
      this.checkIfAlreadyVisited(newX, newY, this._direction);
      this.updateMapWithPosition();
    } else {
      this.checkIfAlreadyVisited(newX, newY, this._direction);
      this.map.setNode(this._x, this._y, MapNodeType.Visited);
      this._x = newX;
      this._y = newY;
      this.updateMapWithPosition();
    }
  }
}
