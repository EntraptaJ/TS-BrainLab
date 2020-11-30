// src/Modules/HelloWorld/HelloWorldResolver.ts
import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { timeout } from '../../Utils/timeout';
import { APILogger } from '../Logger/APILoggerService';

@Service()
@Resolver()
export class HelloWorldResolver {
  public constructor(private readonly logger: APILogger) {
    console.log('HelloWorldResolver created!');
  }

  @Query(() => String)
  public async helloWorld1(): Promise<string> {
    await timeout(100);

    this.logger.log('HelloWorld');

    return 'helloWorld1';
  }
}
