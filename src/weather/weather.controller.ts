import { Controller, Sse, Logger } from '@nestjs/common';
import { Observable, interval, map, take } from 'rxjs';
import { WeatherService } from './weather.service';
import { WeatherForecastMessageEvent } from './weather.forecast.message';

@Controller('weather')
export class WeatherController {  
  private readonly logger = new Logger(WeatherController.name);

  constructor(private readonly weatherService: WeatherService) {}

  @Sse('forecast')
  getWeatherForecast(): Observable<WeatherForecastMessageEvent> {     
    this.logger.debug('Get weather forecast NEW stream CONNECTION');
    return this.weatherService.getWeatherForecast();        
  }
} 