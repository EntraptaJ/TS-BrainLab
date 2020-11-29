/* eslint-disable no-useless-constructor */
// src/Modules/NumberAI/NumberAIResolver.ts
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NumberAIInput } from './NumberAIInput';
import { numbersNetwork } from './NumberAINetwork';
import { NumberAI } from './NumberModel';

@Resolver()
export class NumberAIResolver {
  public constructor(
    @InjectRepository(NumberAI)
    private readonly numberAIRepository: Repository<NumberAI>,
  ) {}

  @Query(() => [NumberAI])
  public numberAIs(): Promise<NumberAI[]> {
    return this.numberAIRepository.find({
      order: {
        text: 'ASC',
      },
    });
  }

  @Mutation(() => [NumberAI])
  public async createNumberAI(
    @Arg('input', () => NumberAIInput) input: NumberAIInput,
  ): Promise<NumberAI[]> {
    const numberAI = this.numberAIRepository.create(input);
    await this.numberAIRepository.save(numberAI);

    return this.numberAIRepository.find({
      order: {
        text: 'ASC',
      },
    });
  }

  @Mutation(() => String)
  public testNumberString(@Arg('input') input: string): string {
    return numbersNetwork.testNumbers(input);
  }

  @Mutation(() => Boolean)
  public trainNumbersNetwork(): boolean {
    setImmediate(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      numbersNetwork.trainNetwork();
    }, 1500);

    return true;
  }

  @Mutation(() => [NumberAI])
  public async deleteNumberAI(
    @Arg('numberId', () => ID) id: string,
  ): Promise<NumberAI[]> {
    await this.numberAIRepository.delete(id);

    return this.numberAIRepository.find({
      order: {
        text: 'ASC',
      },
    });
  }
}
