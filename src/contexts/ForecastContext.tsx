import {createContext, ReactNode, useState} from 'react';
import {defaultCities, getCity, ICityGeocoding} from '../Api/GeocodingApi.ts';
import {
  Auth,
  defaultCurrentWeatherData,
  ICity,
  IWeatherDetails,
  Weather
} from '../Api/BackendApi.ts';
import {ITheme} from '../App.tsx';
import {getTheme} from '../settings/theme.tsx';


interface IForecastContextData {
  search: {
    isOpen: boolean;
    value: string;
    open: () => void;
    close: () => void;
    changeValue: (value: string) => void;
    searchCity: (value: string) => void;
  };
  cityList: {
    list: ICityGeocoding[];
    selected: ICity;
    select: (city: ICity) => void;
    favorite(city: ICity): void;
    unFavorite(city: ICity): void;
  };
  weather: {
    getForecast: () => void;
    weatherDetails: IWeatherDetails;
    isFavorite: boolean;
  };
}


interface IForecastProviderProps {
  children: ReactNode;
  changeTheme: (theme: ITheme) => void;
}


export const ForecastContext = createContext<IForecastContextData>({} as IForecastContextData);

export const ForecastProvider = ({children, changeTheme, ...rest}: IForecastProviderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [listCityValue, setListCityValue] = useState<ICityGeocoding[]>(defaultCities);
  const [selectedCity, setSelectedCity] = useState<ICity>(defaultSelectedCity);
  const [weatherDetails, setWeatherDetails] = useState<IWeatherDetails>({
        currentWeather: defaultCurrentWeatherData,
        forecast: []
      })
  ;
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  function searchCity(value: string) {
    if (value === '') {
      setListCityValue(defaultCities);
      return;
    }
    setSearchValue(value);
    getCity(value).then((response) => {
      setListCityValue(response);
    }).catch((err) => {
      setListCityValue(err);
    });
  }

  function getForecast() {
    Weather.getWeatherDetails(selectedCity).then((response) => {
      setWeatherDetails(response);
      changeTheme(getTheme(response.currentWeather.climate));
    }).catch((err) => {
      setWeatherDetails({
        currentWeather: defaultCurrentWeatherData,
        forecast: [],
      });
    });

  }

  function favorite(city: ICity) {
    Auth.addFavoriteCity(selectedCity).then(() => {
      setIsFavorite(true);
    }).catch((err) => {
      console.log(err);
    });
  }

  function unFavorite(city: ICity) {
    Auth.removeFavoriteCity(selectedCity).then(() => {
      setIsFavorite(false);
    }).catch((err) => {
      console.log(err);
    });
  }

  function changeSearchValue(value: string) {
    setSearchValue(value);
  }

  function changeSelectedCity(city: ICity) {
    closeSearch();
    if (city.id != '' && city.id != null) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
    setSelectedCity(city);
  }

  function openSearch() {
    setIsSearchOpen(true);
  }

  function closeSearch() {
    setIsSearchOpen(false);
  }

  return (
      <ForecastContext.Provider value={{
        search: {
          isOpen: isSearchOpen,
          value: searchValue,
          open: openSearch,
          close: closeSearch,
          searchCity,
          changeValue: changeSearchValue
        },
        cityList: {
          list: listCityValue,
          selected: selectedCity,
          favorite,
          unFavorite,
          select: changeSelectedCity,
        },
        weather: {
          weatherDetails,
          isFavorite,
          getForecast
        }
      }}>
        {children}
      </ForecastContext.Provider>
  );
};


const defaultSelectedCity = {
  id: 'ID',
  name: 'São Paulo',
  countryCode: 'BR',
  coords: {
    latitude: -23.5489,
    longitude: -46.6388
  }
};