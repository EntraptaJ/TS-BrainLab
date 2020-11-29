// src/Modules/Purchases/PurchaseModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from '../Items/ItemModel';

@ObjectType()
@Entity()
export class Purchase {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @ManyToOne(() => Item)
  public item: Item;
}
