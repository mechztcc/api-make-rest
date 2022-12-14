import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService/CreateProductService';

export class ProductsController {
  async create(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const { name, description, price, categoryId } = req.body;

    const createProductService = new CreateProductService();

    const product = await createProductService.execute({
      name,
      description,
      price,
      categoryId,
    });

    return res.json(product);
  }
}
