/* eslint-disable no-useless-constructor */
// src/Modules/NumberAI/NumberAIResolver.ts
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { NumberAIInput } from './NumberAIInput';
import { numbersNetwork } from './NumberAINetwork';
import { NumberAI } from './NumberModel';

@Service()
@Resolver()
export class NumberAIResolver {
  public constructor(
    @InjectRepository(NumberAI)
    private readonly numberAIRepository: Repository<NumberAI>,
  ) {
    console.log('NumberAIResolver created!');
  }

  @Query(() => [NumberAI], {
    description: 'Query all NumberAI entities',
  })
  public numberAIs(): Promise<NumberAI[]> {
    return this.numberAIRepository.find({
      order: {
        text: 'ASC',
      },
    });
  }

  @Mutation(() => [NumberAI], {
    description: 'Create new NumberAI entity',
  })
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

  @Mutation(() => String, {
    description:
      'Using the NumberAI Neural network to test the output of the input string based on existing training data',
  })
  public testNumberString(@Arg('input') input: string): string {
    return numbersNetwork.testNumbers(input);
  }

  @Mutation(() => Boolean, {
    description: 'Start a training job of the NumberAI Neural Network',
  })
  public trainNumbersNetwork(): boolean {
    setImmediate(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      numbersNetwork.trainNetwork();
    }, 1500);

    return true;
  }

  @Mutation(() => [NumberAI], {
    description: 'Delete an existing NumberAI entitiy',
  })
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
