import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './error/http-exception.filter';
import { ConfigService } from 'nestjs-config/index';
import { DatabaseService } from './database/database.service';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('Application Name')
    .setDescription('Application Description')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt-auth')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/api', app, document);

  const configurationService = app.get(ConfigService);
  const databaseService = app.get(DatabaseService);

  try {
    if (configurationService.get('database.migrations.enabled')) {
      console.debug('Migration Enabled.....');
      await databaseService.runMigration();
    } else {
      console.debug('Migration Disabled.....');
    }

    if (configurationService.get('database.seeds.enabled')) {
      console.debug('Seeding Enabled.....');
      await databaseService.runSeed();
    } else {
      console.debug('Seeding Disabled.....');
    }
  } catch (e) {
    console.error('DB migration init failed', e.message);
  }

  await app.listen(3200);
}
bootstrap();
