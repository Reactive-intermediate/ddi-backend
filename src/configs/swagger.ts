import { INestApplication } from '@nestjs/common';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('DDI 競賽')
    .setDescription('DDI 競賽 API document')
    .setVersion('1.0')
    .addTag('ddi')
    .build();

  const customOptions: SwaggerCustomOptions = {
    explorer: true, // 開啟搜尋列
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document, customOptions);
  return 1;
};
