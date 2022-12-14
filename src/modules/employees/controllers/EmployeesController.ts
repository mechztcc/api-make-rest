import { Request, Response } from 'express';
import { CreateEmployeeService } from '../services/CreateEmployeeService/CreateEmployeeService';

export class EmployeesController {
  async create(req: Request, res: Response): Promise<Response> {
    const { name, document, email, phone, type, restaurantId } = req.body;

    const createEmployeeService = new CreateEmployeeService();

    const employee = await createEmployeeService.execute({
      name,
      document,
      email,
      phone,
      type,
      restaurantId,
    });

    return res.json(employee);
  }
}
