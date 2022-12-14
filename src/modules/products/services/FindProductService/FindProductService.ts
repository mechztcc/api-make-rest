import { Product } from '@modules/products/typeorm/entities/Product';
import { ProductsRepository } from '@modules/products/typeorm/repository/ProductsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  id: number;
}

export class FindProductService {
  async execute({ id }: IRequest): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductsRepository);

    const product = await productsRepository.findOne({
      where: { id: id },
      relations: ['category'],
    });

    return product;
  }
}
