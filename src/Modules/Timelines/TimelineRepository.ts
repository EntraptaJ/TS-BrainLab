// src/Modules/Timelines/TimelineRepository.ts
import { EntityManager, Repository } from 'typeorm';
import { Service } from 'typedi';
import { InjectManager, InjectRepository } from 'typeorm-typedi-extensions';
import { Timeline } from './TimelineModel';
import { TimelineInput } from './TimelineInput';
import { Logger } from '../Logger/LoggerService';

@Service()
export class TimelineRepository {
  @InjectManager()
  private entityManager: EntityManager;

  public constructor(
    @InjectRepository(Timeline) private InjectRepository: Repository<Timeline>,
    private logger: Logger,
  ) {}

  public async createTimeline(
    timelineInput: TimelineInput,
  ): Promise<Timeline[]> {
    const timeline = this.InjectRepository.create(timelineInput);
    await this.InjectRepository.save(timeline);

    return this.findAll();
  }

  public saveUsingRepository(timeline: Timeline): Promise<Timeline> {
    return this.InjectRepository.save(timeline);
  }

  public saveUsingManager(timeline: Timeline): Promise<Timeline> {
    return this.entityManager.save(timeline);
  }

  public findAll(): Promise<Timeline[]> {
    this.logger.log('HelloWorld finding timelines');

    return this.InjectRepository.find();
  }
}
