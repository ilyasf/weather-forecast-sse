import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather/weather.controller';
import { WeatherService } from './weather/weather.service';
import { validate } from './config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
    HttpModule
  ],
  controllers: [WeatherController],
  providers: [WeatherService],
})
export class AppModule {} 