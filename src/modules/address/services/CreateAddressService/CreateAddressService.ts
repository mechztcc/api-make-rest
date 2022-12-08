import { AddressesRepository } from '@modules/address/typeorm/repository/AddressesRepository';
import { getCustomRepository } from 'typeorm';
import { Address } from '@modules/address/typeorm/entities/Address';
import { UsersRepository } from '@modules/users/typeorm/repositories/UsersRepository';
import AppError from '@config/errors/AppError';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';

interface IRequest {
  state: string;
  city: string;
  street: string;
  number: string;
  zip: string;
  complement: string;
  restaurantId: number;
}

export class CreateAddressService {
  async execute({
    state,
    city,
    number,
    street,
    zip,
    complement,
    restaurantId,
  }: IRequest): Promise<Address> {
    const addressRepository = getCustomRepository(AddressesRepository);
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurant = await restaurantsRepository.findById(restaurantId);
    if (!restaurant) {
      throw new AppError('Restaurant not found.');
    }

    const address = addressRepository.create({
      state,
      city,
      number,
      street,
      zip,
      complement,
      restaurant: restaurant,
    });

    await addressRepository.save(address);
    return address;
  }
}
