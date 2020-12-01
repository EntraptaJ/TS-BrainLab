// src/Modules/Jobs/JobQue.ts
import Bull from 'bull';
import { config } from '../../Library/Config';

export const jobQue = new Bull<string>('JobQue', {
  redis: {
    host: config.redis.host,
  },
});

type Callback2Type<T> = T extends (
  concurrency: number,
  callback: infer X,
) => Promise<void>
  ? X
  : any;

type FunctionInput = (concurrency: number, input: infer x) => Promise<void>;

type BullType<T> = T extends Bull.Queue<infer X> ? X : never;

type BullProcessFN<Bull> = BullType<Bull> extends never
  ? never
  : Bull.ProcessPromiseFunction<BullType<Bull>>;

export type JobQueType = BullType<typeof jobQue>;

export type JobQueProcessFN = BullProcessFN<typeof jobQue>;
