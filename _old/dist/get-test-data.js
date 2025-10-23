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
async function getTestData() {
    try {
        console.log('Connecting to database...');
        await dataSource.initialize();
        console.log('Database connection successful!\n');
        console.log('=== TEST DATA FOR ENDPOINT TESTING ===\n');
        console.log('1. USERS DATA:');
        const users = await dataSource.query('SELECT id, name, role_id FROM users ORDER BY id');
        users.forEach((user) => {
            console.log(`   - ${user.name} (ID: ${user.id}, Role: ${user.role_id})`);
        });
        console.log('');
        console.log('2. ROLES DATA:');
        const roles = await dataSource.query('SELECT id, name FROM roles ORDER BY level');
        roles.forEach((role) => {
            console.log(`   - ${role.name} (ID: ${role.id})`);
        });
        console.log('');
        console.log('3. EMERGENCY REPORTS DATA:');
        const reports = await dataSource.query(`
      SELECT id, type, severity, status, reported_by 
      FROM emergency_reports 
      ORDER BY created_at
    `);
        reports.forEach((report) => {
            console.log(`   - ${report.type} (ID: ${report.id}, Severity: ${report.severity}, Status: ${report.status}, Reported by: ${report.reported_by})`);
        });
        console.log('');
        console.log('4. THREADS DATA:');
        const threads = await dataSource.query(`
      SELECT t.id, t.report_id, er.type as report_type
      FROM threads t
      JOIN emergency_reports er ON t.report_id = er.id
      ORDER BY t.created_at
    `);
        threads.forEach((thread) => {
            console.log(`   - Thread ${thread.id} for ${thread.report_type} (Report ID: ${thread.report_id})`);
        });
        console.log('');
        console.log('5. MESSAGES DATA:');
        const messages = await dataSource.query(`
      SELECT m.id, m.thread_id, m.sender_id, u.name as sender_name
      FROM messages m
      JOIN users u ON m.sender_id = u.id
      ORDER BY m.sent_at
    `);
        messages.forEach((message) => {
            console.log(`   - Message ${message.id} in thread ${message.thread_id} from ${message.sender_name} (Sender ID: ${message.sender_id})`);
        });
        console.log('');
        console.log('6. OTHER TABLES WITH DATA:');
        const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name
    `);
        for (const table of tables) {
            const tableName = table.table_name;
            try {
                const countResult = await dataSource.query(`SELECT COUNT(*) as count FROM ${tableName}`);
                const count = parseInt(countResult[0].count);
                if (count > 0 && !['users', 'roles', 'emergency_reports', 'threads', 'messages'].includes(tableName)) {
                    console.log(`   - ${tableName}: ${count} records`);
                }
            }
            catch (error) {
            }
        }
        console.log('');
        console.log('=== END OF TEST DATA ===\n');
        await dataSource.destroy();
    }
    catch (error) {
        console.error('Error:', error);
        if (dataSource.isInitialized) {
            await dataSource.destroy();
        }
    }
}
getTestData();
//# sourceMappingURL=get-test-data.js.map