/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { Product } from "./product.entity"
import { VariantOption } from "./variantOption.entity"

@Entity('variants')
export class Variant {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    variantName: string

    @Column()
    productId:number

    @OneToMany(()=>VariantOption,(variantOption)=>variantOption.variant)
    variantOption:VariantOption[]

    @ManyToOne(()=>Product,(product)=>product.variant)
    product:Product

}