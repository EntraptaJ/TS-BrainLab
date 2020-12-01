// src/Modules/Jobs/TestJob.ts
import { logger, LogMode } from '../../Library/Logging';
import { timeout } from '../../Utils/timeout';
import type { JobQueProcessFN, JobQueType } from './JobQue';

export async function testJob(
  job: Parameters<JobQueProcessFN>['0'],
): Promise<JobQueType> {
  logger.log(LogMode.INFO, 'Running Task');
  console.log(`Test job running with input of ${job.data}`);

  await timeout(10000);

  return 'helloWorld';
}
