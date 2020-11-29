// src/Modules/Timelines/TimelineModel.ts
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Timeline {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field(() => Int)
  @Column('integer')
  public timelineId: number;

  @Column('boolean', {
    default: false,
    unique: true,
  })
  @Field(() => Boolean)
  public result: boolean;
}
