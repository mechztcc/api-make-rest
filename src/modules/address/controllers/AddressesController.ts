import { Request, Response } from 'express';

import { CreateAddressService } from '../services/CreateAddressService/CreateAddressService';

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
}
