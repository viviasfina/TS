/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableVariantOptions1677643878167 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        'CREATE TABLE `variant_options`(' +
            '    `id` int NOT NULL AUTO_INCREMENT,' +
            '     `variantId` int NOT NULL,' +
            '     `name` varchar(45) NOT NULL,' +
            '     `priceDifference` decimal(9,2) NOT NULL,' +
            '     PRIMARY KEY (`id`),' +
            '      FOREIGN KEY (variantId) REFERENCES variants(id)' +
            '   );' 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
