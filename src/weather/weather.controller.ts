import { Controller, Sse } from '@nestjs/common';
import { Observable, interval, map } from 'rxjs';
import { WeatherService } from './weather.service';
import { WeatherForecastMessageEvent } from './weather.forecast.message';

@Controller('weather')
export class WeatherController {
  private weatherForecast: WeatherForecastMessageEvent;
  constructor(private readonly weatherService: WeatherService) {
    interval(5000).subscribe(async () => {
      this.weatherForecast = await this.weatherService.getWeatherForecast();
    });
  }

  @Sse('forecast')
  getWeatherForecast(): Observable<WeatherForecastMessageEvent> {        
    return interval(5000).pipe(
      map(() => this.weatherForecast)
    );
  }
} 