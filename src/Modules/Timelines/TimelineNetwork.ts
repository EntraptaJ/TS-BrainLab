// src/Modules/Timelines/TimelineNetwork.ts

import { recurrent } from 'brain.js';
import { Container, Service } from 'typedi';
import { LSTMNetworkController } from '../../Library/Brain/NetworkController';
import { TimelineRepository } from './TimelineRepository';

@Service()
class TimelineNetworkController {
  public network: recurrent.LSTM;

  public constructor(
    private timelineRepository: TimelineRepository,
    private networkController: LSTMNetworkController,
  ) {}

  public async trainNetwork(): Promise<void> {
    const timelines = await this.timelineRepository.findAll();

    console.log(timelines);

    this.network = await this.networkController.createNetwork(
      'timelines',
      timelines.map(({ timelineId, result }) => ({
        input: timelineId.toString(),
        output: result === true ? '1' : '0',
      })),
    );
  }

  public testTimeline(timelineId: number): boolean {
    const result = this.network.run(timelineId.toString());

    return result === '1';
  }
}

export const timelineNetworkController = Container.get(
  TimelineNetworkController,
);
