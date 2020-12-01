// src/Modules/Timelines/TimelineRepository.ts
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { TimelineInput } from './TimelineInput';
import { Timeline } from './TimelineModel';

@Service()
export class TimelineRepository {
  public constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
  ) {}

  /**
   * Create a new timeline database entity
   * @param timelineInput Input data for new timeline entitiy
   *
   * @returns Promise resolving to an array of all Database entries
   */
  public async createTimeline(
    timelineInput: TimelineInput,
  ): Promise<Timeline[]> {
    const timeline = this.timelineRepository.create(timelineInput);
    await this.timelineRepository.save(timeline);

    return this.findAll();
  }

  /**
   * Save a timeline entity in database
   * @param timeline Timeline Entity
   *
   * @returns Promise resolving to the saved database entry
   */
  public saveUsingRepository(timeline: Timeline): Promise<Timeline> {
    return this.timelineRepository.save(timeline);
  }

  /**
   * Find all entities in database
   *
   * @returns Promise resolving to all Timeline entities in database
   */
  public findAll(): Promise<Timeline[]> {
    return this.timelineRepository.find();
  }
}
