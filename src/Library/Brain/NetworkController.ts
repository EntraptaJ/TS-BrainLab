// src/Library/Brain/NetworkController.ts
import { Service } from 'typedi';
import * as brain from 'brain.js';
import { Logger } from '../../Modules/Logger/LoggerService';

interface TrainingData {
  input: string | string[];

  output: string;
}

@Service()
export class NetworkController {
  public network: brain.recurrent.LSTM = new brain.recurrent.LSTM();

  public constructor(private logger: Logger) {}

  public trainNetwork(inputData: TrainingData[]): brain.INeuralNetworkState {
    this.logger.log(`Training neural network`, this);
    return this.network.train(inputData, {
      iterations: 500,
      log: true,
      logPeriod: 50,
    });
  }
}
