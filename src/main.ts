import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformResponseInterceptor } from './shared/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformResponseInterceptor(reflector));
  await app.listen(3000);
}
bootstrap();
