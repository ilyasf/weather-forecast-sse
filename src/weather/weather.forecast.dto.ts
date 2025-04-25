import { WeatherForecastApiResponse } from "./weather.forecast.api.response";
import { WeatherForecastData } from "./weather.forecast.message";

export class WeatherForecastDto implements WeatherForecastData {
    area: `${string}, ${string}`;
    temperature: `${number}°C`;

    constructor(data: WeatherForecastApiResponse) {        
        this.area = this.getArea(data);
        this.temperature = this.getTemperature(data);
    }

    private getArea(data: WeatherForecastApiResponse): `${string}, ${string}` {
        return `${data.name}, ${data.sys.country}`;
    }

    private getTemperature(data: WeatherForecastApiResponse): `${number}°C` {
        return `${data.main.temp}°C`;
    }

    public export(): WeatherForecastData {
        return {
            area: this.area,
            temperature: this.temperature
        };
    }
}