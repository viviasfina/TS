/* eslint-disable prettier/prettier */
import { ColumnDecimalTransformer } from "../ColumnDecimalTransformer.class"
import{ Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Variant } from "./variant.entity"

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
      unique:true
    })
    productName: string

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 2,
        default: '0.00',
        transformer: new ColumnDecimalTransformer(),
      })
    price: number

    @Column({
      default:0
    })
    position: number

    @Column()
    categoryName: string

    @OneToMany(()=>Variant,(variant) => variant.product)
    variant:Variant[]
}