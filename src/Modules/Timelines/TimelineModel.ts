// src/Modules/Timelines/TimelineModel.ts
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Timeline {
  @Field(() => ID, {
    description: 'Internal database UUID',
  })
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field(() => Int, {
    description: 'Timeline identifier',
  })
  @Column('integer')
  public timelineId: number;

  @Field(() => Boolean, {
    description: 'Is the timeline safe and a postive result',
  })
  @Column('boolean', {
    default: false,
    unique: true,
  })
  public result: boolean;
}
