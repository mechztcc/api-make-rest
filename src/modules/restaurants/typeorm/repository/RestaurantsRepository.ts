import { EntityRepository, getManager, Repository } from 'typeorm';
import { Restaurant } from '../entities/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantsRepository extends Repository<Restaurant> {
  findById(id: number): Promise<Restaurant | undefined> {
    const restaurant = this.createQueryBuilder('restaurants')
      .where('id = :id', { id: id })
      .getOne();
    return restaurant;
  }
}
