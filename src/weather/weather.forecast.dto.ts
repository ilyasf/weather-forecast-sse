import { WeatherForecastApiResponse } from "./weather.forecast.api.response";
import { CloudsInfo, WeatherForecastData } from "./weather.forecast.message";

export class WeatherForecastDto implements WeatherForecastData {
    area: `${string}, ${string}`;
    temperature: `${number}°C`;
    clouds: CloudsInfo;
    __id: string;

    constructor(data: WeatherForecastApiResponse) {        
        this.area = this.getArea(data);
        this.temperature = this.getTemperature(data);
        const cloudData = data.weather.find(data => data.main === 'Clouds');
        if (cloudData) {
            this.clouds = cloudData as CloudsInfo;
        }
        this.__id = `${data.id}`;
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
            temperature: this.temperature,
            clouds: this.clouds,
            __id: this.__id
        };
    }
}