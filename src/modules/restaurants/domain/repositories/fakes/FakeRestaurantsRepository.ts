import { faker } from '@faker-js/faker';
import { ICreateRestaurant } from '../../models/CreateRestaurant.interface';
import { IRestaurant } from '../../models/Restaurant.interface';
import { IRestaurantsRepository } from '../interfaces/RestaurantsRepository.interface';

export class FakerRestaurantsRepository implements IRestaurantsRepository {
  public restaurants: IRestaurant[] = [];

  async findById(id: number): Promise<IRestaurant | undefined> {
    const restaurant = this.restaurants.find((restaurant) => {
      return restaurant.id === id;
    });
    return restaurant;
  }

  async findAllByUser(id: number): Promise<IRestaurant[]> {
    const restaurant = this.restaurants.filter((restaurant) => {
      if (restaurant.user.id === id) {
        return restaurant;
      }
    });

    return restaurant;
  }

  findWithUser(id: number): Promise<IRestaurant | undefined> {
    throw new Error('Method not implemented.');
  }

  async create({
    name,
    details,
    user,
    opened,
  }: ICreateRestaurant): Promise<IRestaurant> {
    const restaurant: IRestaurant = {
      categories: [],
      employees: [],
      created_at: new Date(),
      updated_at: new Date(),
      details,
      name,
      opened,
      user,
      id: Number(faker.random.numeric()),
    };

    return restaurant;
  }

  async save(restaurant: IRestaurant): Promise<IRestaurant> {
    this.restaurants.push(restaurant);
    return restaurant;
  }
}
