"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = Number.parseInt(process.env.PORT) || 3000;
    app.setGlobalPrefix('api');
    const options = new swagger_1.DocumentBuilder()
        .addBearerAuth()
        .setTitle('Bookshelf APP')
        .setDescription('Bookshelf API documentation')
        .setVersion('1.0')
        .addTag('BookShelf')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, options);
    swagger_1.SwaggerModule.setup('swagger', app, document);
    await app.listen(port, () => console.log(`App running on port ${port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map