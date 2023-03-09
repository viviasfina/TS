/* eslint-disable prettier/prettier */
import { ColumnDecimalTransformer } from "../ColumnDecimalTransformer.class"
import{ Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { OrderItem } from "./orderItem.entity"

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    invoiceNumber: string

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 2,
        default: '0.00',
        transformer: new ColumnDecimalTransformer(),
      })
    total: number

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 2,
        default: '0.00',
        transformer: new ColumnDecimalTransformer(),
      })
    discount: number

    @Column({
      type: 'decimal',
      precision: 9,
      scale: 2,
      default: '0.00',
      transformer: new ColumnDecimalTransformer(),
    })
    paymentAmounts: number

    @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
    orderItem: OrderItem[]
}
