import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function configureSwagger(app) {
  const config = new DocumentBuilder()
    .setTitle('Api Nestjs - Service')
    .setDescription('Task - Community Health Workers')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
