/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableOrderItems1677644603085 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        'CREATE TABLE `order_items`(' +
            '    `id` int NOT NULL AUTO_INCREMENT,' +
            '      `orderId` int NOT NULL,' +
            '     `product` TEXT NOT NULL,' +
            '     `itemVariantPrice` decimal(9,2) NOT NULL,' +
            '     `variants` TEXT NOT NULL,' +
            '     PRIMARY KEY (`id`), ' +
            '      FOREIGN KEY(orderId) REFERENCES orders(id)' +
            '   );' 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
