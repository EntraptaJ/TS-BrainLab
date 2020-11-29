// src/Modules/Timelines/TimelineResolver.ts
import { Arg, ID, Mutation, Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Logger } from '../Logger/LoggerService';
import { TimelineInput } from './TimelineInput';
import { Timeline } from './TimelineModel';
import { testTimeline } from './TimelineNetwork';
import { TimelineRepository } from './TimelineRepository';

@Service()
@Resolver()
export class TimelineResolver {
  public constructor(
    private timelineRepository: TimelineRepository,
    private logger: Logger,
  ) {}

  @Query(() => [Timeline])
  public timelines(): Promise<Timeline[]> {
    this.logger.log('Resolver query finding timelines');

    return this.timelineRepository.findAll();
  }

  @Mutation(() => [Timeline])
  public async createTimeline(
    @Arg('input', () => TimelineInput) input: TimelineInput,
  ): Promise<Timeline[]> {
    return this.timelineRepository.createTimeline(input);
  }

  @Mutation(() => Boolean)
  public isTimelineSafe(
    @Arg('timelineId', () => ID) timelineId: number,
  ): boolean {
    return testTimeline(timelineId);
  }
}
