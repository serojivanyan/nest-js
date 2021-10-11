import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
async function bootstrap() {
  console.log(process.env.PORT);
  const port = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.MEDIA_TYPE,
    key: 'v=',
  });
  const config = new DocumentBuilder()
    .setTitle('Nest js app ')
    .setDescription('Documentation for nest js app ')
    .setVersion('1.0.0')
    .addTag('nestJs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(port, () => console.log(`Server listen on port ${port}`));
}
bootstrap();
