// src/Modules/Items/ItemResolver.ts
import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { ItemInput } from './ItemInput';
import { Item } from './ItemModel';

@Resolver()
export class ItemResolver {
  public constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  @Query(() => [Item], {
    description: 'Query all Item entities',
  })
  public async items(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  @Mutation(() => [Item], {
    description: 'Create a new Item entity',
  })
  public async createItem(
    @Arg('input', () => ItemInput) input: ItemInput,
  ): Promise<Item[]> {
    const item = this.itemRepository.create(input);
    await this.itemRepository.save(item);

    return this.itemRepository.find();
  }
}
