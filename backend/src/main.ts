import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { EnvironmentService } from './app/global/environment/environment.service';
import { injectSwaggerToApp } from './configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const PORT = app.get(EnvironmentService).PORT;
  injectSwaggerToApp(app);
  await app.listen(PORT, () => console.log(`Backend started at port ${PORT}`));
}

bootstrap();
