export declare const configuration: () => {
    NODE_ENV: string;
    port: number;
    database: {
        port: number;
        name: string;
        host: string;
        type: string;
        user: string;
        password: string;
    };
    jwt: {
        secret: string;
        expiresIn: string;
    };
};
