export type CloudsInfo = {
    id: number;
    main: 'Clouds';
    description: string;
    icon: string;
}

export interface WeatherForecastData {
    area: `${string}, ${string}`,
    temperature: `${number}°C`,
    clouds: CloudsInfo,
    __id: string
};

export interface WeatherForecastMessageEvent {
    data: WeatherForecastData;
    id?: string;
    type?: string;
    retry?: number;
}