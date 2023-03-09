/* eslint-disable prettier/prettier */
import { ColumnDecimalTransformer } from "../ColumnDecimalTransformer.class"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Variant } from "./variant.entity"


@Entity('variant_options')
export class VariantOption {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    variantId: number

    @Column()
    name: string

    @Column({
        type: 'decimal',
        precision: 9,
        scale: 2,
        default: '0.00',
        transformer: new ColumnDecimalTransformer(),
      })
    priceDifference: number

    @ManyToOne(()=>Variant, (variant)=> variant.variantOption)
    variant:Variant
}