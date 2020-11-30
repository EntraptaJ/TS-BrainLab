// src/Modules/Jobs/JobRepository.ts
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { APILogger } from '../Logger/APILoggerService';
import { Job } from './JobModel';
import { jobQue, JobQueType } from './JobQue';
import { JobStatus } from './JobStatus';
import { testJob } from './TestJob';

@Service()
export class JobRepository {
  public constructor(
    @InjectRepository(Job)
    private jobRepository: Repository<Job>,
    private readonly logger: APILogger,
  ) {}

  public async createJob(inputString: string): Promise<Job> {
    const job = this.jobRepository.create({
      input: inputString,
    });

    this.logger.log('Creating Job: ', job);

    await this.saveUsingRepository(job);

    this.logger.log('Created Job: ', job);

    jobQue.process(job.id, 1, testJob);

    this.logger.log('Creating Job: ', job);

    const queJob = await jobQue.add(job.id, job.input, {
      jobId: job.id,
    });

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

  public saveUsingRepository(job: Job): Promise<Job> {
    return this.jobRepository.save(job);
  }

  public findAll(): Promise<Job[]> {
    return this.jobRepository.find();
  }
}
