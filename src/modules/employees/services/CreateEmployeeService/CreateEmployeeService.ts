import AppError from '@config/errors/AppError';
import { Employee } from '@modules/employees/typeorm/entities/Employee';
import { EmployeesRepository } from '@modules/employees/typeorm/repositories/EmployeesRepository';
import { RestaurantsRepository } from '@modules/restaurants/typeorm/repository/RestaurantsRepository';
import { getCustomRepository } from 'typeorm';

interface IRequest {
  name: string;
  document: string;
  email: string;
  phone: string;
  type: string;
  restaurantId: number;
}

export class CreateEmployeeService {
  async execute({
    document,
    email,
    name,
    phone,
    restaurantId,
    type,
  }: IRequest): Promise<Employee> {
    const employeesRepository = getCustomRepository(EmployeesRepository);
    const restaurantsRepository = getCustomRepository(RestaurantsRepository);

    const restaurantExists = await restaurantsRepository.findOne({
      where: { id: restaurantId },
    });
    if (!restaurantsRepository) {
      throw new AppError('Restaurant not found', 404);
    }

    const employee = employeesRepository.create({
      document,
      email,
      name,
      phone,
      restaurant: restaurantExists,
    });

    await employeesRepository.save(employee);

    return employee;
  }
}
