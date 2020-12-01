// src/Modules/Jobs/JobModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { JobStatus } from './JobStatus';

/**
 * Job Entity Model Class
 */
@ObjectType()
@Entity()
export class Job {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field(() => JobStatus, {
    description: 'Status of the Job',
  })
  @Column({
    enum: JobStatus,
    default: JobStatus.PENDING,
    type: 'enum',
  })
  public status: JobStatus;

  @Field(() => String)
  @Column('varchar')
  public input: string;

  @Field(() => String, {
    nullable: true,
  })
  @Column('varchar', {
    nullable: true,
  })
  public output: string;
}
