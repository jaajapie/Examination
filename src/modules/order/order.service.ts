import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../database/entities/Orders';
import { OrderRepository } from '../database/repositories/order.repository';
import { CreateOrderDto } from './dto/createorder.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderRepository)
    private orderRepository: OrderRepository,
  ) {}
  async getOrders(): Promise<Order[]> {
    const found = await this.orderRepository.find();
    if (!found) {
      throw new NotFoundException(`Order not found`);
    }

    return found;
  }
  async getOrderById(id: string): Promise<Order> {
    const found = await this.orderRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Order with ID "${id}" not found`);
    }

    return found;
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const { lat, lng, total } = createOrderDto;
    const order = this.orderRepository.create({
      lat,
      lng,
      total,
    });

    await this.orderRepository.save(order);
    return order;
  }

  async uploadOrder(createOrderDtos: CreateOrderDto[]) {
    await this.orderRepository.save(createOrderDtos);
  }
}
