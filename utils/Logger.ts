export interface ILogger {
  debug(message: unknown, ...optionalParams: unknown[]): void;
  warn(message: unknown, ...optionalParams: unknown[]): void;
  log(message: unknown, ...optionalParams: unknown[]): void;
  error(message: unknown, ...optionalParams: unknown[]): void;
}

export class ConsoleLogger implements ILogger {
  private readonly isSampleMode: boolean;

  constructor(isSampleMode: boolean) {
    this.isSampleMode = isSampleMode;
  }

  debug(message: unknown, ...optionalParams: unknown[]): void {
    if (this.isSampleMode) {
      console.debug(message, ...optionalParams);
    }
  }

  log(message: unknown, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams);
  }

  warn(message: unknown, ...optionalParams: unknown[]): void {
    console.warn(message, ...optionalParams);
  }

  error(message: unknown, ...optionalParams: unknown[]): void {
    console.error(message, ...optionalParams);
  }
}
