// src/Library/Brain/NetworkController.ts
import * as brain from 'brain.js';
import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';
import { Service } from 'typedi';

interface TrainingData {
  input: string | string[];

  output: string;
}

// const networkMap = new Map();

@Service()
export class LSTMNetworkController {
  public constructor() {
    console.log('Creating new LSTMNetworkController');
  }

  public async loadSavedNetwork(
    networkName: string,
  ): Promise<brain.INeuralNetworkJSON | undefined> {
    const networksFolder = resolve('networks');
    const fileName = `${networkName}.json`;

    // Read all files within the Networks folder
    const trainedNetworks = await readdir(networksFolder);

    // If The array of files within the folder includes the name of our network read the file and parse the JSON
    if (trainedNetworks.includes(fileName)) {
      const filePath = resolve(networksFolder, fileName);

      const trainingData = await readFile(filePath);

      console.log(`Training data for ${networkName} has been loaded`);

      return JSON.parse(trainingData.toString()) as brain.INeuralNetworkJSON;
    }

    return undefined;
  }

  public saveNetwork(
    networkName: string,
    trainingJSON: brain.INeuralNetworkJSON,
  ): Promise<void> {
    const fileName = `${networkName}.json`;

    console.log(`Saving network data to ${fileName}`);

    return writeFile(
      resolve('networks', fileName),
      JSON.stringify(trainingJSON),
    );
  }

  public async createNetwork(
    networkName: string,
    trainingData: TrainingData[],
    forceRetrain = false,
  ): Promise<brain.recurrent.LSTM> {
    const network = new brain.recurrent.LSTM();
    console.log(`Created new ${networkName} network`);

    console.log('Training new network');

    // Attempt to load the network from disk
    const networkTraining = await this.loadSavedNetwork(networkName);
    if (networkTraining) {
      network.fromJSON(networkTraining);
    }

    // If no existing training was found, or if we want to force retrain then train and save the network
    if (!networkTraining || forceRetrain === true) {
      this.trainNetwork(network, trainingData);

      // Save Network training data to disk for retrieval
      await this.saveNetwork(networkName, network.toJSON());
    }

    return network;
  }

  public trainNetwork(
    network: brain.recurrent.LSTM,
    trainingData: TrainingData[],
  ): brain.INeuralNetworkState {
    return network.train(trainingData, {
      iterations: 500,
      log: true,
      logPeriod: 50,
    });
  }
}
