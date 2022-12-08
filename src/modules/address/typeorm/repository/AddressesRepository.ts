import { Repository } from 'typeorm';
import { Address } from '../entities/Address';

export class AddressesRepository extends Repository<Address> {}
