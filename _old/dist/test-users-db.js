"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const configService = new config_1.ConfigService();
const dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    host: configService.get('DB_HOST', 'localhost'),
    port: parseInt(configService.get('DB_PORT', '8080'), 10),
    username: configService.get('DB_USERNAME', 'postgres'),
    password: configService.get('DB_PASSWORD', '123'),
    database: configService.get('DB_DATABASE', 'INKINGI'),
    entities: [__dirname + '/src/**/*.entity{.ts,.js}'],
    synchronize: false,
    logging: false,
});
async function testUsersFromDatabase() {
    try {
        console.log('Connecting to database...');
        await dataSource.initialize();
        console.log('Database connection successful!');
        console.log('\n--- Users from Database ---');
        const users = await dataSource.query(`
      SELECT id, name, phone, email, role_id, district, availability
      FROM users
      ORDER BY id
    `);
        console.log('Found', users.length, 'users:');
        users.forEach((user, index) => {
            console.log(`${index + 1}. ${user.name} (${user.id}) - ${user.role_id} in ${user.district}`);
        });
        await dataSource.destroy();
    }
    catch (error) {
        console.error('Error:', error);
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
}
testUsersFromDatabase();
//# sourceMappingURL=test-users-db.js.map