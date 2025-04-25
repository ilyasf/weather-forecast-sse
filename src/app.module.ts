import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {} 