import { 
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey
} from "typeorm";

export class AddUserIdFieldToRefreshTokens1634221860834 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'refresh_tokens',
            new TableColumn({
                name: 'user_id',
                type: 'uuid',
                isNullable: true
            })
        )

        await queryRunner.createForeignKey(
            'refresh_tokens',
            new TableForeignKey({
                name: 'RefreshTokenUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE'
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('refresh_tokens', 'RefreshTokenUser')

        await queryRunner.dropColumn('refresh_tokens', 'user_id')
    }
}
