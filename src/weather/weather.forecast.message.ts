export interface WeatherForecastData {
    area: `${string}, ${string}`,
    temperature: `${number}°C`
};

export interface WeatherForecastMessageEvent {
    data: WeatherForecastData;
    id?: string;
    type?: string;
    retry?: number;
  }