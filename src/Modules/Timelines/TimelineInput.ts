// src/Modules/Timelines/TimelineInput.ts
import { Field, InputType } from 'type-graphql';
import { Timeline } from './TimelineModel';

@InputType()
export class TimelineInput implements Partial<Timeline> {
  @Field()
  public timelineId: number;

  @Field()
  public result: boolean;
}
