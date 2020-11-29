// src/Modules/Numbers/NumberModel.ts
import { Field, ID, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class NumberAI {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  public readonly id: string;

  @Column('varchar')
  @Field()
  public text: string;

  @Column('varchar')
  @Field()
  public output: string;
}
