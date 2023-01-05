import { ICreateRestaurant } from '@modules/restaurants/domain/models/CreateRestaurant.interface';
import { IRestaurant } from '@modules/restaurants/domain/models/Restaurant.interface';
import { IRestaurantsRepository } from '@modules/restaurants/domain/repositories/interfaces/RestaurantsRepository.interface';
import { EntityRepository, getRepository, Repository } from 'typeorm';
import { Restaurant } from '../entities/Restaurant';

@EntityRepository(Restaurant)
export class RestaurantsRepository implements IRestaurantsRepository {
  private repository: Repository<Restaurant>;

  constructor() {
    this.repository = getRepository(Restaurant);
  }
  async create(rest: ICreateRestaurant): Promise<IRestaurant> {
    const restaurant =  this.repository.create({
      name: rest.name,
      categories: rest.categories,
      details: rest.details,
      employees: rest.employees,
      opened: rest.opened,
      user: rest.user,
    });
    return restaurant;
  }

  async save(restaurant: IRestaurant): Promise<IRestaurant> {
    const rest = await this.repository.save(restaurant);
    return rest;
  }

  findById(id: number): Promise<Restaurant | undefined> {
    const restaurant = this.repository
      .createQueryBuilder('restaurants')
      .where('id = :id', { id: id })
      .getOne();
    return restaurant;
  }

  findAllByUser(id: number): Promise<Restaurant[]> {
    const restaurants = this.repository
      .createQueryBuilder('restaurants')
      .where('restaurants.userId = :id', { id: id })
      .getMany();

    return restaurants;
  }

  findWithUser(id: number): Promise<Restaurant | undefined> {
    const restaurant = this.repository.findOne({
      where: { id: id },
      relations: ['user'],
    });

    return restaurant;
  }
}
