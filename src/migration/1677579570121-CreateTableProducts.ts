import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTableProducts1677579570121 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            'CREATE TABLE `products`(' +
            '    `id` int NOT NULL AUTO_INCREMENT,' +
            '     `productName` varchar(45) NOT NULL,' +
            '     `price` decimal(9,2) NOT NULL,' +
            '     `position` int NOT NULL,' +
            '     `categoryName` varchar(45) NOT NULL,' +
            '     PRIMARY KEY (`id`)' +
            '   );' 
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE  `products`');
    }

}
