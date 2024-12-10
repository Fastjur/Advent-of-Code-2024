import { IStrategy } from "../../PuzzleProcessor.ts";
import { ILogger } from "../../../utils/Logger.ts";

export class Day06Part02Strategy implements IStrategy {
  constructor(private readonly logger: ILogger) {
  }

  execute(input: string): Promise<string> {
    return Promise.resolve("");
  }
}
