require('dotenv').config()
module.exports = {
    database: {
        use_env_variable: 'development',
        // development: {
        //     host: process.env.MYSQL_HOST || 'xxx',
        //     port: process.env.MYSQL_PORT || '3306',
        //     username: process.env.MYSQL_USER || 'xxx',
        //     password: process.env.MYSQL_PASSWORD || 'xxx',
        //     database: process.env.MYSQL_DATABASE || 'xxx',
        //     dialect: 'mysql',
        //     timezone: '+07:00',
        //     logging: console.log
        // },
        development: {
            host: process.env.MSSQL_HOST || '127.0.0.1',
            port: process.env.MSSQL_PORT || '3306',
            username: process.env.MSSQL_USER || 'sa',
            password: process.env.MSSQL_PASSWORD || 'xxx',
            database: process.env.MSSQL_DATABASE || 'dashboard_hosting',
            dialect: 'mssql',
            timezone: '+07:00',
            logging: console.log
        },
        test: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00',
            logging: console.log
        },
        production: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
            timezone: '+07:00'
        }
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'xxx',
        algorithm: process.env.JWT_ALGORITHM || 'xxx',
        ttl: process.env.JWT_TTL || 24 * 60 * 60, // default: 30 days
        secret_refresh: process.env.JWT_SECRET_REFRESH || 'xxx',
        algorithm_refresh: process.env.JWT_ALGORITHM_REFRESH || 'xxx',
        ttl_refresh: '90d'
    },
}