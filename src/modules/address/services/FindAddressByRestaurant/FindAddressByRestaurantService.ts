import AppError from '@config/errors/AppError';
import { Address } from '@modules/address/typeorm/entities/Address';
import { AddressesRepository } from '@modules/address/typeorm/repository/AddressesRepository';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  restaurantId: number;
}

export class FindAddressByRestaurantService {
  async execute({ restaurantId }: IRequest): Promise<Address | undefined> {
    const addressRepository = getCustomRepository(AddressesRepository);
    const restaurantRepository = getCustomRepository(RestaurantsRepository);

    const restaurant = await restaurantRepository.findOne({
      where: { id: restaurantId },
    });
    if (!restaurant) {
      throw new AppError('Restaurant not found.');
    }

    const address = addressRepository.findOne({
      where: { restaurant: restaurant },
    });

    return address;
  }
}
