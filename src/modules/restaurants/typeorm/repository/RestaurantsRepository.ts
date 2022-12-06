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

  findAllByUser(id: number): Promise<Restaurant[]> {
    const restaurants = this.createQueryBuilder('restaurants')
      .where('restaurants.userId = :id', { id: id })
      .getMany();

    return restaurants;
  }

  findWithUser(id: number): Promise<Restaurant | undefined> {
    const restaurant = this.findOne({
      where: { id: id },
      relations: ['user'],
    });

    return restaurant;
  }
}
