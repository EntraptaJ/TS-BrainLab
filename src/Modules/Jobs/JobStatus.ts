// src/Modules/Jobs/JobStatus.ts
import { registerEnumType } from 'type-graphql';

export enum JobStatus {
  PENDING = 'Pending',
  RUNNING = 'Running',
  FINISHED = 'Finished',
  EXCEPTION = 'Exception',
}

registerEnumType(JobStatus, {
  name: 'JobStatus',
});
