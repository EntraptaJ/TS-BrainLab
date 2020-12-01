// src/Modules/Jobs/JobRepository.ts
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { APILogger } from '../Logger/APILoggerService';
import { Job } from './JobModel';
import { jobQue } from './JobQue';
import { JobStatus } from './JobStatus';
import { testJob } from './TestJob';

/**
 * Job Service Class
 */
@Service()
export class JobRepository {
  public constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private readonly logger: APILogger,
  ) {}

  /**
   * Create a string processing worker and create a new que job with the provided string
   * @param inputString String for the worker to process
   *
   * @returns Promise resolving to the created
   * @see Job
   */
  public async createJob(inputString: string): Promise<Job> {
    const job = this.jobRepository.create({
      input: inputString,
    });

    this.logger.log('Creating Job: ', job);

    await this.saveUsingRepository(job);

    this.logger.log('Created Job: ', job);

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    jobQue.process(job.id, 1, testJob);

    this.logger.log('Creating Job: ', job);

    /**
     * Add task to Redis Bull Que
     */
    const queJob = await jobQue.add(job.id, job.input, {
      jobId: job.id,
    });

    // When job finishes update the Job entry status to finished with the output result or status exception upon error
    queJob.finished().then(
      async (result: string) => {
        this.logger.log('Job done: ', result);
        await this.jobRepository.update(job.id, {
          output: result,
          status: JobStatus.FINISHED,
        });
      },
      async (data) => {
        this.logger.log('Job failded: ', data);
        await this.jobRepository.update(job.id, {
          status: JobStatus.EXCEPTION,
        });
      },
    );

    this.logger.log('Created Job: ', job);

    return job;
  }

  /**
   * Save Job entity to database
   * @param job Job entity
   *
   * @returns Promise resolving to the saved Job entity after the database entry has saved
   */
  public saveUsingRepository(job: Job): Promise<Job> {
    return this.jobRepository.save(job);
  }

  /**
   * Find all Job entities
   * @returns Promise resolving to an array of all Job entities in the database
   */
  public findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }
}
