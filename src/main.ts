import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { APP_CONFIG } from '@/config/index.config';
import { ErrorExceptionFilter, SuccessInterceptor } from '@/global/index.global';
import { AuthGuard } from '@/guard/index.guard';

export let app = undefined;

function setupSwaggerDoc(): void {
  if (process.env.NODE_ENV === 'production') return;

  const options = new DocumentBuilder()
    .setTitle('nestjs-jwt-demo-api-docs')
    .setDescription('nestjs-jwt-demo')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/api-doc', app, document, { yamlDocumentUrl: '/api-yaml' });
}

function setupApp(): void {
  app
    .useGlobalGuards(new AuthGuard())
    .useGlobalInterceptors(new SuccessInterceptor())
    .useGlobalFilters(new ErrorExceptionFilter())
    .enableCors();

  app.listen(APP_CONFIG.APP_PORT);
}

(async (): Promise<void> => {
  try {
    app = await NestFactory.create(AppModule);

    setupSwaggerDoc();
    setupApp();
    setTimeout(() => console.log(`server running in http://127.0.0.1:${APP_CONFIG.APP_PORT}/`));
  } catch (err) {
    console.error(`server running error`, err);
  }
})();
