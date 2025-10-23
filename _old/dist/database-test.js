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
async function testConnection() {
    try {
        console.log('Attempting to connect to database...');
        await dataSource.initialize();
        console.log('Database connection successful!');
        const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
        console.log('\nAvailable tables:');
        tables.forEach((table) => {
            console.log(`- ${table.table_name}`);
        });
        const tableNames = tables.map((t) => t.table_name);
        if (tableNames.includes('users')) {
            console.log('\n--- Users Table ---');
            const users = await dataSource.query('SELECT * FROM users LIMIT 5');
            console.log(users);
        }
        if (tableNames.includes('roles')) {
            console.log('\n--- Roles Table ---');
            const roles = await dataSource.query('SELECT * FROM roles LIMIT 5');
            console.log(roles);
        }
        if (tableNames.includes('emergency_reports')) {
            console.log('\n--- Emergency Reports Table ---');
            const reports = await dataSource.query('SELECT * FROM emergency_reports LIMIT 5');
            console.log(reports);
        }
        await dataSource.destroy();
    }
    catch (error) {
        console.error('Database connection failed:', error);
    }
}
testConnection();
//# sourceMappingURL=database-test.js.map