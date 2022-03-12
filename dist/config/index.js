"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configuration = void 0;
const configuration = () => ({
    NODE_ENV: process.env.NODE_ENV,
    port: parseInt(process.env.PORT, 10) || 3001,
    database: {
        port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
        name: process.env.DATABASE_NAME,
        host: process.env.DATABASE_HOST,
        type: process.env.DB_TYPE,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
    },
    jwt: {
        secret: process.env.JWT_ACCESS_TOKEN_SECRET,
        expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
    },
});
exports.configuration = configuration;
//# sourceMappingURL=index.js.map