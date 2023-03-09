/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableOrders1677644537947 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        'CREATE TABLE `orders`(' +
            '    `id` int NOT NULL AUTO_INCREMENT,' +
            '     `invoiceNumber` varchar(45) NOT NULL,' +
            '     `total` decimal(9,2) NOT NULL,' +
            '     `discount` decimal(9,2) NOT NULL,' +
            '     `paymentAmounts` decimal(9,2) NOT NULL,' +
            '     PRIMARY KEY (`id`)' +
            '   );' 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
