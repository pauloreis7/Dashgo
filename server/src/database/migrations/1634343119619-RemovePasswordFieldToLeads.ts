import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class RemovePasswordFieldToLeads1634343119619 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('leads', 'password')
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'leads',
            new TableColumn({
                name: 'password',
                type: 'varchar'
            })
        )
    }

}
