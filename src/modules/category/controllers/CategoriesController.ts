import { Request, Response } from 'express';
import { CreateCategoryService } from '../services/CreateCategoryService/CreateCategoryService';
import { FindCategoryByIdService } from '../services/FindCategoryByIdService/FindCategoryByIdService';

export class CategoriesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, restaurantId } = req.body;
    const user = req.user;
    const createCategoryService = new CreateCategoryService();

    const category = await createCategoryService.execute({
      name,
      restaurantId,
      userId: Number(user.id),
    });

    return res.json(category);
  }

  async findById(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const findCategoryByIdService = new FindCategoryByIdService();

    const category = await findCategoryByIdService.execute({ id: Number(id) });

    return res.json(category);
  }
}
