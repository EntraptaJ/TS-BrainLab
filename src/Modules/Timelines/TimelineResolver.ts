// src/Modules/Timelines/TimelineResolver.ts
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { APILogger } from '../Logger/APILoggerService';
import { TimelineInput } from './TimelineInput';
import { Timeline } from './TimelineModel';
import { timelineNetworkController } from './TimelineNetwork';
import { TimelineRepository } from './TimelineRepository';

@Service()
@Resolver()
export class TimelineResolver {
  public constructor(
    private timelineRepository: TimelineRepository,
    private logger: APILogger,
  ) {
    console.log('TimelineResolver created!');
  }

  @Query(() => [Timeline], {
    description: 'Query all Timeline entities',
  })
  public timelines(): Promise<Timeline[]> {
    this.logger.log('Resolver query finding timelines');

    return this.timelineRepository.findAll();
  }

  @Mutation(() => [Timeline], {
    description: 'Create a new timeline entity',
  })
  public async createTimeline(
    @Arg('input', () => TimelineInput) input: TimelineInput,
  ): Promise<Timeline[]> {
    return this.timelineRepository.createTimeline(input);
  }

  @Mutation(() => Boolean, {
    description: 'Start a training job of the Timeline analysis Neural Network',
  })
  public trainTimelineNetwork(): boolean {
    setImmediate(() => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      timelineNetworkController.trainNetwork();
    }, 1500);

    return true;
  }

  @Mutation(() => Boolean, {
    description:
      'Use the timeline neural network to determine if a timeline is safe or not based on current data',
  })
  public isTimelineSafe(
    @Arg('timelineId', () => ID) timelineId: number,
  ): boolean {
    return timelineNetworkController.testTimeline(timelineId);
  }
}
