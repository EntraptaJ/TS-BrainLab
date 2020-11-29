// src/Library/Brain1.ts
import * as brain from 'brain.js';
import { readdir, readFile, writeFile } from 'fs/promises';
import { resolve } from 'path';

interface TrainingData {
  input: string | string[];

  output: string;
}

/**
 * Loads a JSON file containing training data, if no training data exists returns undefined
 * @param networkName Name of the neural network
 *
 * @returns Training data JSON or undefined if network has not been created or saved yet.
 */
async function loadSavedNetwork(
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

    return JSON.parse(trainingData.toString()) as brain.INeuralNetworkJSON;
  }

  return undefined;
}

/**
 * Save a Neural Network's JSON training data to disk
 * @param networkName Name of the neural network you'd like to save to disk
 * @param trainingJSON Object containing the JSON training data of a Brain Neural Network
 *
 * @returns Promise that resolves to void once file has been saved
 */
async function saveNetworkTraining(
  networkName: string,
  trainingJSON: brain.INeuralNetworkJSON,
): Promise<void> {
  const fileName = `${networkName}.json`;

  console.log(`Saving network data to ${fileName}`);

  return writeFile(resolve('networks', fileName), JSON.stringify(trainingJSON));
}

function trainLSTMNetwork(
  network: brain.recurrent.LSTM,
  trainingData: TrainingData[],
): brain.INeuralNetworkState {
  return network.train(trainingData, {
    iterations: 500,
    log: true,
    logPeriod: 50,
  });
}

// type BasicTypes = string | number

// interface ObjectInputTrainingData {
//   [key: string]: BasicTypes;
// }

// type InputTrainingData = BasicTypes | BasicTypes[] | ObjectInputTrainingData;

// export async function processInputTrainingData(trainingData: InputTrainingData):

/**
 * Create or load an existing neural network.
 * @param networkName Name of the neural network, if changed it will be retrained as the retrieval of existing networks is based on the networkName
 * @param trainingData Array containing training data to use to train the model
 * @param forceRetrain Force the training even if a pretrained model exists
 *
 * @returns Promise resolving to a Brian LSTM network
 */
export async function createLSTMNetwork(
  networkName: string,
  trainingData: TrainingData[],
  forceRetrain = false,
): Promise<brain.recurrent.LSTM> {
  const network = new brain.recurrent.LSTM();
  console.log(`Created new ${networkName} network`);

  console.log('Training new network');

  // Attempt to load the network from disk
  const networkTraining = await loadSavedNetwork(networkName);
  if (networkTraining) {
    network.fromJSON(networkTraining);
  }

  // If no existing training was found, or if we want to force retrain then train and save the network
  if (!networkTraining || forceRetrain === true) {
    trainLSTMNetwork(network, trainingData);

    // Save Network training data to disk for retrieval
    await saveNetworkTraining(networkName, network.toJSON());
  }

  return network;
}
