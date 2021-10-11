import { 
    MigrationInterface, 
    QueryRunner, 
    TableColumn, 
    TableForeignKey 
} from "typeorm";

export class AddUserIdFieldToLeads1633989434137 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'leads',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            'leads',
            new TableForeignKey({
                name: 'LeadUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('leads', 'LeadUser')

        await queryRunner.dropColumn('leads', 'user_id')
    }
}
