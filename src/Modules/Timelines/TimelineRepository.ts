// src/Modules/Timelines/TimelineRepository.ts
import { Service } from 'typedi';
import { EntityManager, Repository } from 'typeorm';
import { InjectManager, InjectRepository } from 'typeorm-typedi-extensions';
import { TimelineInput } from './TimelineInput';
import { Timeline } from './TimelineModel';

@Service()
export class TimelineRepository {
  @InjectManager()
  private entityManager: EntityManager;

  public constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
  ) {}

  public async createTimeline(
    timelineInput: TimelineInput,
  ): Promise<Timeline[]> {
    const timeline = this.timelineRepository.create(timelineInput);
    await this.timelineRepository.save(timeline);

    return this.findAll();
  }

  public saveUsingRepository(timeline: Timeline): Promise<Timeline> {
    return this.timelineRepository.save(timeline);
  }

  public saveUsingManager(timeline: Timeline): Promise<Timeline> {
    return this.entityManager.save(timeline);
  }

  public findAll(): Promise<Timeline[]> {
    return this.timelineRepository.find();
  }
}
