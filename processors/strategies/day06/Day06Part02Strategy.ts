import { IStrategy } from "../../PuzzleProcessor.ts";
import { ILogger } from "../../../utils/Logger.ts";
import { MapNodeType, PatrolMap } from "./PatrolMap.ts";
import { AlreadyVisitedError } from "./Guard.ts";

export class Day06Part02Strategy implements IStrategy {
  constructor(private readonly logger: ILogger) {
  }

  private walkGuardUntilOffMap(map: PatrolMap): void {
    let i = 0;
    while (!map.guardWalkedOff) {
      this.logger.debug(`\n\nIteration ${i}`);
      const guard = map.getGuard();
      guard.walk();
      this.logger.debug(map.toString());
      i++;
    }
  }

  execute(input: string): Promise<string> {
    const map = new PatrolMap(this.logger, input);
    const initialGuard = map.getGuard();
    this.logger.log(map.toString());

    this.walkGuardUntilOffMap(map);

    this.logger.debug("\n\nCurrent map state with all walked positions:");
    this.logger.debug(map.toString());

    const visitedNodes = map.getNodesOfType(MapNodeType.Visited);
    let numPositions = 0;
    let nodesTried = 0;
    for (const node of visitedNodes) {
      nodesTried++;
      this.logger.log(
        `\n\nTrying node ${nodesTried} of ${visitedNodes.length}`,
      );
      if (initialGuard.x === node.x && initialGuard.y === node.y) {
        continue;
      }
      const mapWithNewObstruction = new PatrolMap(this.logger, input);
      mapWithNewObstruction.setNode(node.x, node.y, MapNodeType.Obstruction);
      this.logger.debug("\n\nAdding obstruction, new map:");
      this.logger.debug(mapWithNewObstruction.toString());

      try {
        this.walkGuardUntilOffMap(mapWithNewObstruction);
      } catch (e) {
        if (e instanceof AlreadyVisitedError) {
          this.logger.log(
            `\n\nLoop detected at ${node.x},${node.y}, incrementing counter and continuing with next possible node`,
          );
          numPositions++;
          continue;
        }
      }
    }

    return Promise.resolve(numPositions.toString());
  }
}
