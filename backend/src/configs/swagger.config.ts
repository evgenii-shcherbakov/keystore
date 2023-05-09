import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';

const swaggerConfig = new DocumentBuilder()
  .setTitle('Spotify')
  .setDescription('Spotify API description')
  .setVersion('1.0')
  .build();

export const injectSwaggerToApp = (app: INestApplication) => {
  const swaggerDocument: OpenAPIObject = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('', app, swaggerDocument);
};
