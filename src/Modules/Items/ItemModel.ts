// src/Modules/Items/Item.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Item {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Field(() => String)
  @Column('varchar')
  public title: string;

  @Field(() => Number)
  @Column('integer')
  public cost: number;
}
