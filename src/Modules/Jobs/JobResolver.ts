// src/Modules/Jobs/JobResolver.ts
import { Arg, Mutation, Query } from 'type-graphql';
import { Service } from 'typedi';
import { Job } from './JobModel';
import { jobQue } from './JobQue';
import { JobRepository } from './JobRepository';

@Service()
export class JobResolver {
  public constructor(private jobRepository: JobRepository) {}

  @Query(() => [Job])
  public jobs(): Promise<Job[]> {
    return this.jobRepository.findAll();
  }

  @Mutation(() => Job)
  public createJob(@Arg('input', () => String) input: string): Promise<Job> {
    return this.jobRepository.createJob(input);
  }

  @Query(() => Boolean)
  public async redisCheck(): Promise<boolean> {
    const test = await jobQue.getWorkers();

    console.log(test);

    return true;
  }
}
