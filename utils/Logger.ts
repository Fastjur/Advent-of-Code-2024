export interface ILogger {
  debug(message: string, ...optionalParams: unknown[]): void;
  warn(message: string, ...optionalParams: unknown[]): void;
  log(message: string, ...optionalParams: unknown[]): void;
  error(message: string, ...optionalParams: unknown[]): void;
}

export class ConsoleLogger implements ILogger {
  private readonly isSampleMode: boolean;

  constructor(isSampleMode: boolean) {
    this.isSampleMode = isSampleMode;
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    if (this.isSampleMode) {
      console.debug(message, ...optionalParams);
    }
  }

  log(message: string, ...optionalParams: unknown[]): void {
    console.log(message, ...optionalParams);
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    console.warn(message, ...optionalParams);
  }

  error(message: string, ...optionalParams: unknown[]): void {
    console.error(message, ...optionalParams);
  }
}
