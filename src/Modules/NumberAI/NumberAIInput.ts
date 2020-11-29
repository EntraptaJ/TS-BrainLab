// src/Modules/NumberAI/NumberAIInput.ts
import { Field, InputType } from 'type-graphql';
import { NumberAI } from './NumberModel';

@InputType()
export class NumberAIInput implements Partial<NumberAI> {
  @Field(() => String)
  public text: string;

  @Field(() => String)
  public output: string;
}
