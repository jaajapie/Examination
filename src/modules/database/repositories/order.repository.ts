import { EntityRepository, Repository } from 'typeorm';
import { Order } from '../entities/Orders';

@EntityRepository(Order)
export class OrderRepository extends Repository<Order> {}
