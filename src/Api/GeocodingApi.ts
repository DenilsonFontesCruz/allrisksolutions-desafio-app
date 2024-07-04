import Axios from 'axios';

// @ts-ignore
const key = 'f52b7273aebc48edb3a173536e31afaa';

const axios = Axios.create({
  baseURL: 'https://api.openweathermap.org/geo/1.0/',
  headers: {
    'Content-Type': 'application/json'
  },
});

export interface ICityGeocoding {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state: string;
}

export const defaultCities: ICityGeocoding[] =
    [
      {
        name: 'São Paulo',
        state: 'SP',
        country: 'BR',
        lat: -23.5489,
        lon: -46.6388
      },
      {
        name: 'Rio de Janeiro',
        state: 'RJ',
        country: 'BR',
        lat: -22.9068,
        lon: -43.1729
      },
      {
        name: 'Belo Horizonte',
        state: 'MG',
        country: 'BR',
        lat: -19.9167,
        lon: -43.9333
      }
    ];

function compareCity(city: ICityGeocoding, cityToCompare: ICityGeocoding): boolean {
  return city.name == cityToCompare.name && city.state == cityToCompare.state && city.country == cityToCompare.country;
}

function filterDuplicateCity(list: ICityGeocoding[]): ICityGeocoding[] {
  const uniqueCities: ICityGeocoding[] = [];
  list.forEach((city) => {
    if (uniqueCities.find((uniqueCity) => compareCity(city, uniqueCity))) {
      return;
    }
    uniqueCities.push(city);
  });
  return uniqueCities;
}

export const getCity = async (city: string): Promise<ICityGeocoding[]> => {
  try {
    const response = await axios.get(`direct?q=${city}&limit=5&appid=${key}`);

    if (response.status !== 200) {
      throw new Error('Failed to get city');
    }

    if (response.data.length === 0) {
      return defaultCities;
    }

    return filterDuplicateCity(response.data);
    //@ts-ignore
  } catch (err) {
    console.error(err);
    return defaultCities;
  }

};