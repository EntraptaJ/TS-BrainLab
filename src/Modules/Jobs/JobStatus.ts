// src/Modules/Jobs/JobStatus.ts
import { registerEnumType } from 'type-graphql';

/**
 * Status of a Job
 */
export enum JobStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  FINISHED = 'Finished',
  EXCEPTION = 'Exception',
}

registerEnumType(JobStatus, {
  name: 'JobStatus',
});
