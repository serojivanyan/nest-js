import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log(process.env.PORT);
  console.log(process.env.NODE_ENV);
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port, () => console.log(`Server listen on port ${port}`));
}
bootstrap();
