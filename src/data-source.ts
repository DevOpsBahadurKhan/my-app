import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'mysql', // or your database type
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'admin',
    database: 'test',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*.ts'],
    synchronize: true, // Set to false in production
});