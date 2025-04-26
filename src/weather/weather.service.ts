import { Injectable, Logger } from '@nestjs/common';

import { WeatherForecastDto } from './weather.forecast.dto';
import { WeatherForecastData, WeatherForecastMessageEvent } from './weather.forecast.message';
import { HttpService } from '@nestjs/axios';
import { interval, map, mergeMap, Observable } from 'rxjs';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly API_KEY = process.env.OPENWEATHER_API_KEY;
  private readonly CITY = 'London';
  private readonly COUNTRY = 'UK';
  private id: number = 1;

  constructor (private readonly httpService: HttpService) {}

  getWeatherForecast(): Observable<WeatherForecastMessageEvent> {                    
      return interval(5000).pipe(                
        mergeMap(() => this.getWeatherForecastFromAPI()),        
        map((data) => ({ data, id: `${this.id++}` }))
      );
  }

  getWeatherForecastFromAPI(): Observable<WeatherForecastData> {
    return this.httpService.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${this.CITY},${this.COUNTRY}&appid=${this.API_KEY}&units=metric`
    ).pipe(
      map(response => response.data),
      map(data => {
        if (data.cod !== 200) {
          throw new Error(`Ошибка API: ${data.message}`);
        }
        return data;
      }),
      map(data => {
        const weatherForecastDto = new WeatherForecastDto(data);
        this.logger.debug('Get weather forecast data');
        return weatherForecastDto.export();
      })
    );
  }
} 