// src/Modules/NumberAI/NumberAINetwork.ts
import { recurrent } from 'brain.js';
import { Container, Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { LSTMNetworkController } from '../../Library/Brain/NetworkController';
import { NumberAI } from './NumberModel';

@Service()
class NumbersAINetwork {
  public network: recurrent.LSTM;

  public constructor(
    @InjectRepository(NumberAI)
    private readonly numberAIRepository: Repository<NumberAI>,
    private networkController: LSTMNetworkController,
  ) {}

  public async trainNetwork(): Promise<void> {
    const numberRecords = await this.numberAIRepository.find();

    console.log(numberRecords);

    this.network = await this.networkController.createNetwork(
      'numbersAI',
      numberRecords.map(({ text: input, output }) => ({
        input,
        output,
      })),
    );
  }

  public testNumbers(inputString: string): string {
    return this.network.run(inputString);
  }
}

export const numbersNetwork = Container.get(NumbersAINetwork);
