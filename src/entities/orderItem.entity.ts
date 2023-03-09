/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Order } from "./order.entity"
import { ProductDTO } from "../DTOes/ProductDTO.class"
import { VariantDTO } from "src/DTOes/VariantDTO.class"
import { ColumnDecimalTransformer } from "../ColumnDecimalTransformer.class"

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    orderId: number

    @Column({
      type: 'simple-json'
    })
    product: ProductDTO

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 2,
        default: '0.00',
        transformer: new ColumnDecimalTransformer(),
      })
    itemVariantPrice: number

    @Column({
      type: 'simple-json'
    })
    variants: VariantDTO[]

    @ManyToOne(()=>Order, (order)=>order.orderItem)
    order:Order
}