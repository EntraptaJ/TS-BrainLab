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

  /**
   * Train the Timeline Neural network with all existing Timelines and their result in the data
   *
   * @returns Promise resolving once the neural network has been trained
   */
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

  /**
   * Test the potenial outcome of a timeline based on it's Id using the outcome of all timelines in the database using the trained Timeline Neural network
   * @param timelineId Input timeline Id to analyze
   *
   * @returns Boolean result the Timeline Neural network wether it determines the timeline to be safe or not
   */
  public testTimeline(timelineId: number): boolean {
    const result = this.network.run(timelineId.toString());

    return result === '1';
  }
}

export const timelineNetworkController = Container.get(
  TimelineNetworkController,
);
