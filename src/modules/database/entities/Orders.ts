import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('numeric', {
    name: 'lat',
    nullable: false,
    precision: 18,
    scale: 8,
  })
  lat: number;

  @Column('numeric', {
    name: 'lng',
    nullable: false,
    precision: 18,
    scale: 8,
  })
  lng: number;

  @Column('int', {
    name: 'total',
    nullable: false,
  })
  total: number;
}
