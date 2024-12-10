import { ILogger } from "../../../utils/Logger.ts";
import { MapNodeType, PatrolMap } from "./PatrolMap.ts";

export enum GuardDirection {
  UP = "^",
  DOWN = "v",
  LEFT = "<",
  RIGHT = ">",
}

export class Guard {
  private _x: number;
  private _y: number;
  private _direction: GuardDirection;
  public readonly map: PatrolMap;

  constructor(
    private readonly logger: ILogger,
    x: number,
    y: number,
    direction: GuardDirection,
    map: PatrolMap,
  ) {
    this._y = y;
    this._x = x;
    this._direction = direction;
    this.map = map;
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

  public updateMapWithPosition(): void {
    this.map.setNode(this._x, this._y, this.getMapNodeTypeFromDirection());
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
      this.updateMapWithPosition();
    } else {
      this.map.setNode(this._x, this._y, MapNodeType.Visited);
      this._x = newX;
      this._y = newY;
      this.updateMapWithPosition();
    }
  }
}
