import { IStrategy } from "../../PuzzleProcessor.ts";
import { ILogger } from "../../../utils/Logger.ts";
import { MapNodeType, PatrolMap } from "./PatrolMap.ts";

export class Day06Part01Strategy implements IStrategy {
  constructor(private readonly logger: ILogger) {
  }

  execute(input: string): Promise<string> {
    const map = new PatrolMap(this.logger, input);
    this.logger.log(map.toString());

    let i = 0;
    while (!map.guardWalkedOff) {
      this.logger.debug(`\n\nIteration ${i}`);
      const guard = map.getGuard();
      guard.walk();
      this.logger.debug(map.toString());
      i++;
    }
    const visitedNodes = map.countNodesOfType(MapNodeType.Visited);
    return Promise.resolve(String(visitedNodes));
  }
}
