import { Request, Response } from 'express';
import { CreateProductService } from '../services/CreateProductService/CreateProductService';
import { FindProductService } from '../services/FindProductService/FindProductService';

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

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findProductService = new FindProductService();

    const product = await findProductService.execute({ id: Number(id) });

    return res.json(product);
  }
}
