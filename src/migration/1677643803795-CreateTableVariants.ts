/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableVariants1677643803795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
        'CREATE TABLE `variants`(' +
            '    `id` int NOT NULL AUTO_INCREMENT,' +
            '   `productId` int,' +
            '     `variantName` varchar(45) NOT NULL,' +
            '     PRIMARY KEY (`id`),' +
            '       FOREIGN KEY (productId) REFERENCES products(id)' +
            '   );' 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
