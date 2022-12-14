import AppError from '@config/errors/AppError';
import { CategoriesRepository } from '@modules/category/typeorm/repository/CategoriesRepository';
import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductsRepository } from '@modules/products/typeorm/repository/ProductsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  description: string;
  price: string;
  categoryId: number;
}

export class CreateProductService {
  async execute({
    name,
    description,
    price,
    categoryId,
  }: IRequest): Promise<Product> {
    const productsRepository = getCustomRepository(ProductsRepository);
    const categoriesRepository = getCustomRepository(CategoriesRepository);

    const categoryExists = await categoriesRepository.findOne({
      where: { id: categoryId },
    });
    if (!categoryExists) {
      throw new AppError('Category not found.', 404);
    }

    const product = productsRepository.create({
      active: true,
      name: name,
      description: description,
      price: price,
      category: categoryExists,
    });

    await productsRepository.save(product);
    return product;
  }
}
