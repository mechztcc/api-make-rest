import { Request, Response } from 'express';
import { CreateCategoryService } from '../services/CreateCategoryService/CreateCategoryService';

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
}
