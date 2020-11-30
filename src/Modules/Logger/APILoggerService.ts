// src/Modules/Logger/LoggerService.ts
import { Inject, Service } from 'typedi';
import type { Context } from '../../Library/Context';

// this service will be recreated for each request (scoped)
@Service()
export class APILogger {
  public constructor(@Inject('context') private readonly context: Context) {
    console.log('Logger created!');
  }

  public log(...messages: unknown[]): void {
    console.log(`(ID ${this.context.requestId}):`, ...messages);
  }
}
