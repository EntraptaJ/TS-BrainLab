// src/Modules/Purchases/PurchaseResolver.ts
import { Query, Resolver } from 'type-graphql';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { Logger } from '../Logger/LoggerService';
import { Purchase } from './PurchaseModel';

@Resolver()
export class PurchaseResolver {
  public constructor(
    private readonly logger: Logger,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {
    console.log('RecipeResolver created!');
  }

  @Query(() => [Purchase])
  public purchases(): Promise<Purchase[]> {
    this.logger.log('Getting purchases');

    return this.purchaseRepository.find();
  }
}
