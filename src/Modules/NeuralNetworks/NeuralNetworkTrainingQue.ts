// src/Modules/NeuralNetworks/NeuralNetworkTrainingQue.ts
import * as Bull from 'bull';

export const neuralnetworksTrainingQue = new Bull<Config>('BackupChecker', {
  redis: {
    host: process.env.REDIS_HOST || 'Redis',
  },
});
