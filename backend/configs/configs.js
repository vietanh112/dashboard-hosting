require('dotenv').config()
module.exports = {
    database: {
        use_env_variable: 'development',
        development: {
            host: process.env.MYSQL_HOST || 'xxx',
            port: process.env.MYSQL_PORT || '3306',
            username: process.env.MYSQL_USER || 'xxx',
            password: process.env.MYSQL_PASSWORD || 'xxx',
            database: process.env.MYSQL_DATABASE || 'xxx',
            dialect: 'mysql',
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
}