import { Category } from '@modules/category/typeorm/entities/Category';
import { CategoriesRepository } from '@modules/category/typeorm/repository/CategoriesRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: number;
}

export class FindCategoryByIdService {
  async execute({ id }: IRequest): Promise<Category | undefined> {
    const categoryRepository = getCustomRepository(CategoriesRepository);

    const category = await categoryRepository.findOne({ where: { id: id } });
    return category;
  }
}
