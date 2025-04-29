import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from '../weather.service';
import { HttpService } from '@nestjs/axios';
import { of, throwError } from 'rxjs';
import { AxiosResponse, RawAxiosResponseHeaders } from 'axios';
import * as mockResponse from './response.json';

describe('WeatherService', () => {
  let service: WeatherService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should return weather forecast data successfully', (done) => {
    const mockAxiosResponse: AxiosResponse = {
      data: mockResponse.response,
      status: 200,
      statusText: 'OK',
      headers: {} as RawAxiosResponseHeaders,
      config: {
        headers: {} as any
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(of(mockAxiosResponse));

    service.getWeatherForecastFromAPI().subscribe((data) => {
      expect(data).toEqual(expect.objectContaining({
        temperature: '11.77°C',
        __id: '2643743',
        area: 'London, GB',
        clouds: expect.objectContaining({
            description: 'overcast clouds',
            icon: '04d',
            id: 804,
            main: 'Clouds'
        }),
      }));
      done();
    });
  });

  it.skip('should throw an error when API key is invalid', (done) => {// TODO: cover case in service and fix
    const mockErrorResponse = {
      response: {
        data: { cod: 401, message: 'Invalid API key' },
        status: 401,
        statusText: 'Unauthorized',
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockErrorResponse));

    service.getWeatherForecastFromAPI().subscribe({
      error: (err) => {
        expect(err.message).toBe(undefined);
        done();
      },
    });
  });

  it.skip('should throw an error when the server is unavailable', (done) => {// TDO: cover case in service and fix
    const mockErrorResponse = {
      response: {
        data: { cod: 500, message: 'Internal Server Error' },
        status: 500,
        statusText: 'Internal Server Error',
      },
    };

    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => mockErrorResponse));

    service.getWeatherForecastFromAPI().subscribe({
      error: (err) => {
        expect(err.message).toBe('Ошибка API: Internal Server Error');
        done();
      },
    });
  });

  it('should handle unexpected errors gracefully', (done) => {
    jest.spyOn(httpService, 'get').mockReturnValue(throwError(() => new Error('Unexpected error')));

    service.getWeatherForecastFromAPI().subscribe({
      error: (err) => {
        expect(err.message).toBe('Unexpected error');
        done();
      },
    });
  });
});
