import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { WeatherForecastDto } from './weather.forecast.dto';
import { WeatherForecastMessageEvent } from './weather.forecast.message';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly API_KEY = process.env.OPENWEATHER_API_KEY;
  private readonly CITY = 'London';
  private readonly COUNTRY = 'UK';

  async getWeatherForecast(): Promise<WeatherForecastMessageEvent> {    
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${this.CITY},${this.COUNTRY}&appid=${this.API_KEY}&units=metric`
      );
      
      this.logger.debug('Получен ответ от API погоды');
      
      const weatherForecastDto = new WeatherForecastDto(response.data);
      
      return {
        data: weatherForecastDto.export()
      };
    } catch (error) {
      this.logger.error('Ошибка при получении данных о погоде', {
        error: error.message,
        stack: error.stack
      });
      return {
        data: {} as WeatherForecastDto
      };
    }
  }
} 