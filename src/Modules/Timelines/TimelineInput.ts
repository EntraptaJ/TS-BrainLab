// src/Modules/Timelines/TimelineInput.ts
import { Field, InputType } from 'type-graphql';
import { Timeline } from './TimelineModel';

@InputType()
export class TimelineInput implements Partial<Timeline> {
  @Field({
    description: 'Timeline identifier',
  })
  public timelineId: number;

  @Field({
    description: 'End outcome of the timeline, is it safe or not',
  })
  public result: boolean;
}
