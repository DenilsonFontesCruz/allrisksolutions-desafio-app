import Axios from 'axios';


const axios = Axios.create({
  // @ts-ignore
  baseURL: 'http://127.0.0.1:9105',
  headers: {
    'Content-Type': 'application/json'
  },
});

export interface ICoords {
  latitude: number;
  longitude: number;
}

export interface ICity {
  id: string;
  name: string;
  coords: ICoords;
  countryCode: string;
}

export interface IUser {
  id: string;
  username: string;
  favoriteCities: ICity[];
}

export interface ICurrentWeatherData {
  dateTime: string;
  climate: number;
  temperature: number;
  feelsLike: number;
  maxTemperature: number;
  minTemperature: number;
  pressure: number;
  humidity: number;
}

export interface IForecastData {
  dateTime: string;
  climate: number;
  maxTemperature: number;
  minTemperature: number;
}

export interface IDayForecastData {
  date: Date;
  climate: number;
  temperature: number;
  maxTemperature: number;
  minTemperature: number;
}

export interface IWeatherDetails {
  currentWeather: ICurrentWeatherData,
  forecast: IDayForecastData[]
}

export const checkHealth = async (): Promise<void> => {
  const response = await axios.get('/CheckHealth');

  if (response.status !== 200) {
    throw new Error('Failed to connect api');
  }
};
export const Auth = {
  setAccessCode: (accessCode: string): void => {
    axios.defaults.headers.common['Authorization'] = accessCode;
  },

  registerRequest: async (username: string, password: string): Promise<IUser> => {
    try {
      const response = await axios.post<IUser>('/User/register', JSON.stringify({
        username,
        password
      }));
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data || 'Failed to register user');
    }
  },
  loginRequest: async (username: string, password: string): Promise<string> => {
    try {
      const response = await axios.post<string>('/Auth/login', JSON.stringify({
        username,
        password
      }));
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data || 'Failed to login');
    }
  },
  logoutRequest: async (): Promise<void> => {
    try {
      await axios.get('/Auth/logout');
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data || 'Failed to logout');
    }
  },
  getUserInfoRequest: async (): Promise<IUser> => {
    try {
      const response = await axios.get<IUser>('/User/info');
      return response.data;
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data || 'Failed to get user info');
    }
  },

  addFavoriteCity: async (city: ICity): Promise<void> => {
    try {
      await axios.post('/User/add-favorite-city', JSON.stringify(city));
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data || 'Failed to add favorite city');
    }
  },

  removeFavoriteCity: async (city: ICity): Promise<void> => {
    try {
      await axios.post('/User/remove-favorite-city', JSON.stringify(city));
    } catch (error) {
      // @ts-ignore
      throw new Error(error.response.data || 'Failed to remove favorite city');
    }
  }
};

export const defaultCurrentWeatherData: ICurrentWeatherData = {
  dateTime: '0000-00-00T00:00:00',
  climate: 4,
  temperature: 0,
  feelsLike: 0,
  maxTemperature: 0,
  minTemperature: 0,
  pressure: 0,
  humidity: 0
};


export const Weather = {
  getCurrent: async (city: ICity): Promise<ICurrentWeatherData> => {
    try {
      if (city.id === 'ID') {
        return defaultCurrentWeatherData;
      }

      const response = await axios.get<ICurrentWeatherData>(
          `/Forecast/current?cityId=${city.id}&Latitude=${city.coords.latitude}&Longitude=${city.coords.longitude}`
      );

      return formatCurrentWeatherData(response.data);
    } catch (err) {
      console.error(err);
      //@ts-ignore
      throw new Error(err.response.data || 'Failed to get current weather');
    }
  },

  getForecast: async (city: ICity): Promise<IForecastData[]> => {
    try {
      if (city.id === 'ID') {
        return [];
      }

      const response = await axios.get<IForecastData[]>(
          `/Forecast/forecast-five-days?cityId=${city.id}&Latitude=${city.coords.latitude}&Longitude=${city.coords.longitude}`
      );
      return response.data;
    } catch (err) {
      //@ts-ignore
      throw new Error(err.response.data || 'Failed to get forecast');
    }
  },

  getWeatherDetails: async (city: ICity): Promise<IWeatherDetails> => {
    try {
      const currentWeather = await Weather.getCurrent(city);
      const forecast = await Weather.getForecast(city);
      return {
        currentWeather,
        forecast: convertForecastHourToDays(forecast)
      };
    } catch (err) {
      //@ts-ignore
      throw new Error(err.response.data || 'Failed to get weather details');
    }
  }
};

export function convertForecastHourToDays(forecast: IForecastData[]): IDayForecastData[] {
  const daysForecast: IDayForecastData[] = [];
  forecast.forEach((item) => {
        const date = new Date(item.dateTime);
        const day = date.getDate();

        if (daysForecast.find((i) => {
          return i.date.getDate() == day;
        })) {
          return;
        }

        const dayList = forecast.filter((item) => (new Date(item.dateTime)).getDate() == day);
        const climate = Math.round(calculateSumAndAverage(dayList.map((item) => item.climate)).average);
        const temperature = temperatureFormatter(calculateSumAndAverage(dayList.map((item) => (item.maxTemperature + item.minTemperature) / 2)).average);
        const maxTemperature = temperatureFormatter(calculateSumAndAverage(dayList.map((item) => item.maxTemperature)).average);
        const minTemperature = temperatureFormatter(calculateSumAndAverage(dayList.map((item) => item.minTemperature)).average);

        daysForecast.push({
          date,
          climate,
          temperature,
          maxTemperature,
          minTemperature
        });
      }
  );

  return daysForecast;
}

function formatCurrentWeatherData(currentData: ICurrentWeatherData): ICurrentWeatherData {
  return {
    ...currentData,
    temperature: temperatureFormatter(currentData.temperature),
    feelsLike: temperatureFormatter(currentData.feelsLike),
    maxTemperature: temperatureFormatter(currentData.maxTemperature),
    minTemperature: temperatureFormatter(currentData.minTemperature)
  };
}

function temperatureFormatter(temperature: number): number {
  return Math.round(temperature - 273.15);
}

function calculateSumAndAverage(numbers: number[]) {
  const sum = numbers.reduce((acc, current) => acc + current, 0);
  const average = sum / numbers.length;
  return {sum, average};
}

export function getClimateNameByCode(code: number): string {
  switch (code) {
    case 1:
      return 'Thunderstorm';
    case 2:
      return 'Drizzle';
    case 3:
      return 'Rain';
    case 4:
      return 'Snow';
    case 5:
      return 'Atmosphere';
    case 6:
      return 'Clouds';
    case 7:
      return 'Clear';
    default:
      return 'Clear';
  }
}