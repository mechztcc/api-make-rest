import AppError from '@config/errors/AppError';
import { Category } from '@modules/category/typeorm/entities/Category';
import { CategoriesRepository } from '@modules/category/typeorm/repository/CategoriesRepository';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  restaurantId: number;
  userId: number;
}

export class CreateCategoryService {
  async execute({ name, restaurantId, userId }: IRequest): Promise<Category> {
    const categoriesRepository = getCustomRepository(CategoriesRepository);
    const restaurantRepository = getCustomRepository(RestaurantsRepository);

    const restaurantExist = await restaurantRepository.findOne({
      where: { id: restaurantId },
      relations: ['user'],
    });
    if (!restaurantExist) {
      throw new AppError('Restaurant not found.', 404);
    }

    if (restaurantExist.user.id !== userId) {
      throw new AppError(
        'Permission denied, user does not own the restaurant',
        403
      );
    }

    console.log(restaurantExist);

    const category = categoriesRepository.create({
      name,
      restaurant: restaurantExist,
    });

    await categoriesRepository.save(category);

    return category;
  }
}
