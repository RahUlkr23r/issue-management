import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserContextGuard } from './common/guards/user-context.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalGuards(new UserContextGuard());
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
