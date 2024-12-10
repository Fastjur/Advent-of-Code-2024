import { ILogger } from "../../../utils/Logger.ts";
import { Guard, GuardDirection } from "./Guard.ts";

export enum MapNodeType {
  Empty = ".",
  Visited = "X",
  Obstruction = "#",
  GuardUp = "^",
  GuardDown = "v",
  GuardLeft = "<",
  GuardRight = ">",
}

export function isMapNodeType(value: unknown): value is MapNodeType {
  const mapNodeTypes = Object.values(MapNodeType);
  return mapNodeTypes.includes(value as MapNodeType);
}

export function getMapNodeType(value: unknown): MapNodeType {
  if (!isMapNodeType(value)) {
    throw new Error(`Invalid map node type: ${value}`);
  }

  return value;
}

export class MapNode {
  constructor(
    public type: MapNodeType,
    public readonly x: number,
    public readonly y: number,
  ) {}
}

export class PatrolMap {
  private readonly nodes: MapNode[][] = [];
  public guardWalkedOff = false;

  constructor(private readonly logger: ILogger, input: string) {
    const lines = input.split("\n");
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      this.nodes[y] = [];
      for (let x = 0; x < line.length; x++) {
        const type = getMapNodeType(line[x]);
        this.nodes[y][x] = new MapNode(type, x, y);
      }
    }
  }

  toString(): string {
    const width = this.nodes[0].length;
    // log increasing x values
    const header = Array.from({ length: width }, (_, i) => String(i % 10));
    header.unshift(" ");
    const headerString = header.join("");
    const nodesString = this.nodes.map((line, idx) => {
      return `${String(idx % 10)}${line.map((node) => node.type).join("")}`;
    })
      .join("\n");
    return `${headerString}\n${nodesString}`;
  }

  public getGuards(): Guard[] {
    const guards: Guard[] = [];
    for (let y = 0; y < this.nodes.length; y++) {
      for (let x = 0; x < this.nodes[y].length; x++) {
        const node = this.nodes[y][x];
        if (node.type === MapNodeType.GuardUp) {
          guards.push(new Guard(this.logger, x, y, GuardDirection.UP, this));
        }
        if (node.type === MapNodeType.GuardDown) {
          guards.push(new Guard(this.logger, x, y, GuardDirection.DOWN, this));
        }
        if (node.type === MapNodeType.GuardLeft) {
          guards.push(new Guard(this.logger, x, y, GuardDirection.LEFT, this));
        }
        if (node.type === MapNodeType.GuardRight) {
          guards.push(new Guard(this.logger, x, y, GuardDirection.RIGHT, this));
        }
      }
    }
    return guards;
  }

  public isOutOfBounds(x: number, y: number): boolean {
    return this.nodes[y] === undefined || this.nodes[y][x] === undefined;
  }

  public isObstructed(x: number, y: number): boolean {
    return this.nodes[y] && this.nodes[y][x] &&
      this.nodes[y][x].type === MapNodeType.Obstruction;
  }

  public setNode(x: number, y: number, type: MapNodeType): void {
    this.nodes[y][x].type = type;
  }

  public countNodesOfType(type: MapNodeType): number {
    return this.nodes.reduce((acc, line) => {
      return acc + line.filter((node) => node.type === type).length;
    }, 0);
  }
}
