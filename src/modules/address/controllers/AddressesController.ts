import { Request, Response } from 'express';

import { CreateAddressService } from '../services/CreateAddressService/CreateAddressService';
import { FindAddressByRestaurantService } from '../services/FindAddressByRestaurant/FindAddressByRestaurantService';

export class AddressesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { state, city, number, street, zip, restaurantId, complement } =
      req.body;
    const createAddressService = new CreateAddressService();

    const address = await createAddressService.execute({
      state,
      city,
      number,
      street,
      zip,
      complement,
      restaurantId,
    });

    return res.json(address);
  }

  async findByRestaurant(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findAddressByRestaurantService = new FindAddressByRestaurantService();

    const address = await findAddressByRestaurantService.execute({
      restaurantId: Number(id),
    });

    return res.json(address);
  }
}
