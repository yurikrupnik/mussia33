import { Module, INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule as _SwaggerModule, SwaggerCustomOptions } from '@nestjs/swagger';

@Module({})
export class SwaggerModule {
  setup(app: INestApplication, prefix: string, title: string, desc: string) {
    const config = new DocumentBuilder()
      .setTitle(title)
      .setDescription(desc)
      .addBearerAuth()
      .addOAuth2()
      .addBearerAuth()
      .build();

    const document = _SwaggerModule.createDocument(app, config, {
      // ignoreGlobalPrefix: true,
    });
    const swaggerConfig: SwaggerCustomOptions = {};
//    {
//      uiConfig: {},
//      swaggerOptions: {},
//    } as SwaggerCustomOptions
    _SwaggerModule.setup(prefix, app, document, swaggerConfig);
  }
}
