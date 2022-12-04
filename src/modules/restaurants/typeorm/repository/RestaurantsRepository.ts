import { EntityRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantsRepository extends Repository<Restaurant> {}
