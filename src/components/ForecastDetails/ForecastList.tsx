import styled from 'styled-components';
import {ForecastContext} from '../../contexts/ForecastContext.tsx';
import {useContext} from 'react';
import {getWeatherIcon} from '../../settings/theme.tsx';
import {celsiusToFahrenheit} from './ForecastDetails.tsx';

interface ForecastListProps {
  tempUnit: string;
  isCelsius: boolean;
}

export default ({isCelsius, tempUnit}: ForecastListProps) => {
  const {forecast} = useContext(ForecastContext).weather.weatherDetails;

  return (
      <ForecastListStyle>
        {

          forecast.map((item, index) => {
            const formattedDate = `0${item.date.getDate()}/${item.date.getMonth()}`;
            return (
                <ForecastItemStyle key={index}>
                  <ForecastDateStyle>{formattedDate}</ForecastDateStyle>
                  <ForecastTemperatureStyle>{isCelsius ? item.temperature : celsiusToFahrenheit(item.temperature)}{tempUnit}</ForecastTemperatureStyle>
                  <ForecastMinMaxStyl>{isCelsius ? item.minTemperature : celsiusToFahrenheit(item.minTemperature)}{tempUnit}
                    - {isCelsius ? item.maxTemperature : celsiusToFahrenheit(item.maxTemperature)}{tempUnit}</ForecastMinMaxStyl>
                  <ForecastIconStyle>
                    {getWeatherIcon(item.climate)}
                  </ForecastIconStyle>
                </ForecastItemStyle>
            );
          })
        }
      </ForecastListStyle>
  );

}

const ForecastListStyle = styled.div`
  grid-area: list;
  display: grid;
  margin: 1rem 1rem;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const ForecastItemStyle = styled.div`
  display: grid;
  align-items: center;
  justify-items: center;
  grid-template: 
  "date icon" 1rem
  "temperature icon" 3rem
  "min-max icon" 1rem
  / 1fr 3rem;

  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  box-sizing: border-box;
  padding: 1rem 1rem;
  margin: 0.5rem 0;
`;

const ForecastDateStyle = styled.div`
  grid-area: date;
  display: grid;
  font-size: 1.2rem;
  font-family: 'Cantarell', sans-serif;
  color: ${props => props.theme.textColor};
`;

const ForecastTemperatureStyle = styled.div`
  grid-area: temperature;
  display: grid;
  font-size: 1.6rem;
  font-weight: bold;
  font-family: 'Cantarell', sans-serif;
  color: ${props => props.theme.textColor};
`;

const ForecastMinMaxStyl = styled.div`
  grid-area: min-max;
  display: grid;
  font-size: 0.8rem;
  white-space: nowrap;
  font-family: 'Cantarell', sans-serif;
  color: ${props => props.theme.textColor};
`;

const ForecastIconStyle = styled.div`
  grid-area: icon;
  width: 2rem;
  fill: ${props => props.theme.textColor};
`;