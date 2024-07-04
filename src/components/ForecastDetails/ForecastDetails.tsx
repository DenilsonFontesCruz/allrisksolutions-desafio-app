import styled, {useTheme} from 'styled-components';
import {ForecastContext} from '../../contexts/ForecastContext.tsx';
import {useContext, useEffect, useState} from 'react';
import {getWeatherIcon} from '../../settings/theme.tsx';
//@ts-ignore
import FavoriteSvg from '../../assets/favorite.svg?react';
import {getClimateNameByCode} from '../../Api/BackendApi.ts';
import ForecastList from './ForecastList.tsx';
import {AuthContext} from '../../contexts/AuthContext.tsx';

export default () => {
  const forecastContext = useContext(ForecastContext);
  const auth = useContext(AuthContext);
  const {currentWeather} = forecastContext.weather.weatherDetails;
  const theme = useTheme();

  const [isCelsius, setIsCelsius] = useState<boolean>(true);
  const [tempUnit, setTempUnit] = useState<string>('°C');

  useEffect(() => {
    forecastContext.weather.getForecast();
  }, [forecastContext.cityList.selected]);

  function changeTemperatureUnit() {
    setIsCelsius(!isCelsius);
    setTempUnit(isCelsius ? '°F' : '°C');
  }

  function handleFavorite() {
    if (auth.isAuthenticated) {
      forecastContext.weather.isFavorite
          ? forecastContext.cityList.unFavorite(forecastContext.cityList.selected)
          : forecastContext.cityList.favorite(forecastContext.cityList.selected);
    }
  }

  return (
      <ForecastDetailsStyle>
        <TitleStyle><FavoriteButtonStyle onClick={() => {
          handleFavorite();
        }} $selected={forecastContext.weather.isFavorite}/>
          <p>{forecastContext.cityList.selected.name}</p></TitleStyle>
        <TemperatureStyle
            onClick={changeTemperatureUnit}>{isCelsius ? currentWeather.temperature : celsiusToFahrenheit(currentWeather.temperature)}<span>
          {tempUnit}</span>
          {getWeatherIcon(currentWeather.climate)}
        </TemperatureStyle>
        <DescriptionStyle>
          <DescriptionItemStyle>Max Temp:
            <p>{isCelsius ? currentWeather.maxTemperature : celsiusToFahrenheit(currentWeather.maxTemperature)}<span>{tempUnit}</span>
            </p>
          </DescriptionItemStyle>
          <DescriptionItemStyle>Min Tempo:
            <p>{isCelsius ? currentWeather.minTemperature : celsiusToFahrenheit(currentWeather.minTemperature)}
              <span>{tempUnit}</span></p>
          </DescriptionItemStyle>
          <DescriptionItemStyle>Feels Like:
            <p>{isCelsius ? currentWeather.feelsLike : celsiusToFahrenheit(currentWeather.feelsLike)}<span>{tempUnit}</span>
            </p>
          </DescriptionItemStyle>
          <DescriptionItemStyle>Pressure:<p>{currentWeather.pressure}<span>mbar</span></p>
          </DescriptionItemStyle>
          <DescriptionItemStyle>Humidity:<p>{currentWeather.humidity}<span>%</span></p>
          </DescriptionItemStyle>
          <DescriptionItemStyle>Climate:<p>{getClimateNameByCode(currentWeather.climate)}</p>
          </DescriptionItemStyle>
        </DescriptionStyle>
        <ForecastList tempUnit={tempUnit} isCelsius={isCelsius}/>
      </ForecastDetailsStyle>
  );
}

const ForecastDetailsStyle = styled.div`
  min-height: 30rem;
  min-width: 30rem;
  display: grid;
  grid-template: 
    "name list" 6rem
    "temperature list" 2fr
    "description list" 3fr
  / 2fr 1fr;
`;

const TemperatureStyle = styled.div`
  grid-area: temperature;
  font-size: 12rem;
  font-family: "Roboto Light", sans-serif;
  display: grid;
  justify-items: center;
  align-items: center;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  position: relative;
  margin: auto;
  box-sizing: border-box;
  letter-spacing: 0.3rem;
  transform: scaleY(1.2);

  svg {
    transform: scaleY(0.9);
    width: 2.5rem;
    fill: ${props => props.theme.textColor};
    position: absolute;
    top: calc(50% - 1.25rem);
    left: -3rem;
    transition: all 0.2s ease-in-out;
  }

  span {
    font-size: 3rem;
    position: absolute;
    top: 1.5rem;
    right: -3.5rem;
    font-weight: bold;
  }

  &:hover {
    cursor: pointer;
    opacity: 1;
    text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    transform: scaleX(1.12) scaleY(1.3);
    transition: all 0.2s ease-in-out;
  }

  &:hover svg {
    transform: scale(0.8);
    transition: all 0.2s ease-in-out;
    filter: drop-shadow(2px 2px 5px rgba(0, 0, 0, 0.3));
  }
`;

const DescriptionStyle = styled.div`
  grid-area: description;
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr 1fr;
`;

const DescriptionItemStyle = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  font-family: "Roboto Light", sans-serif;
  color: ${props => props.theme.textColor};
  opacity: 0.8;
  transition: all 0.2s ease-in-out;
  padding: 1rem 2rem;
  box-sizing: border-box;
  font-weight: lighter;
  text-transform: uppercase;

  p {
    box-sizing: border-box;
    padding: 1rem 0.5rem;
    font-size: 1.6rem;
    font-weight: bold;
    text-transform: none;

    span {
      font-size: 1.2rem;
      font-weight: lighter;
    }
  }
`;

const TitleStyle = styled.div`
  grid-area: name;
  display: grid;
  grid-template: 1fr / 3rem 1fr;
  margin: 1rem;
  align-items: center;
  box-sizing: border-box;
  gap: 0.5rem;

  p {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: "Roboto Light", sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.2rem;
    text-transform: uppercase;
    color: ${props => props.theme.textColor};
  }
`;

const FavoriteButtonStyle = styled(FavoriteSvg)<{ $selected: boolean }>`
  width: 3rem;
  fill: ${props => props.$selected ? props.theme.textColor : 'none'};
  stroke: ${props => props.theme.textColor};
  transition: all 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    transform: scale(1.2);
    fill: ${props => props.theme.textColor}
    transition: all 0.2s ease-in-out;
  }
`;

export function celsiusToFahrenheit(temperature: number) {
  return Math.round((temperature * 1.8) + 32);
}
