// src/Modules/Items/ItemInput.ts
import { Field, InputType, Int } from 'type-graphql';
import { Item } from './ItemModel';

@InputType()
export class ItemInput implements Partial<Item> {
  @Field({
    nullable: true,
  })
  public title?: string;

  @Field(() => Int, {
    nullable: true,
  })
  public cost: number;
}
