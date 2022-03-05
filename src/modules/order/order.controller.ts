import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Order } from '../database/entities/Orders';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/createOrder.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  @Get('')
  getOrders(): Promise<Order[]> {
    return this.orderService.getOrders();
  }

  @Get('/:id')
  getOrderById(@Param('id') id: string): Promise<Order> {
    return this.orderService.getOrderById(id);
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @Body() body: CreateOrderDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const arrOrder = file.buffer.toString().split('\r\n');
    const uploadDto: CreateOrderDto[] = [];

    for (let i = 1; i < arrOrder.length; i++) {
      const innersplit = arrOrder[i].split(',');
      if (arrOrder[i] == '') {
        continue;
      }

      const lat = innersplit[0].replace(/["\\]/g, '');
      const lng = innersplit[1].replace(/["\\]/g, '');

      uploadDto.push({
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        total: Number(innersplit[2]),
      });
    }

    this.orderService.uploadOrder(uploadDto);

    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
