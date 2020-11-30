// src/Modules/Purchases/PurchaseResolver.ts
import { Query, Resolver } from 'type-graphql';
import { Service } from 'typedi';
import { Repository } from 'typeorm';
import { InjectRepository } from 'typeorm-typedi-extensions';
import { APILogger } from '../Logger/APILoggerService';
import { Purchase } from './PurchaseModel';

@Service()
@Resolver()
export class PurchaseResolver {
  public constructor(
    private readonly logger: APILogger,
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
  ) {
    console.log('PurchaseResolver created!');
  }

  @Query(() => [Purchase])
  public purchases(): Promise<Purchase[]> {
    this.logger.log('Getting purchases');

    return this.purchaseRepository.find();
  }
}
