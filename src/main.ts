import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import helmet from 'helmet';
import { GlobalExceptionFilter } from './shared/http-exception.filter';
import * as csurf from 'csurf';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.enableCors();
  app.use(morgan('short'));
  app.use(csurf());
  app.use(helmet());
  app.use(compression());

  app.useGlobalFilters(new GlobalExceptionFilter());

  (app as any).set('etag', false);
  app.use((req, res, next) => {
    res.removeHeader('x-powered-by');
    res.removeHeader('date');
    next();
  });
  await app.listen(5000);
}
bootstrap();
