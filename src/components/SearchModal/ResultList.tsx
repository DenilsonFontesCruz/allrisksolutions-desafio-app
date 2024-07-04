import styled from 'styled-components';
import {useContext} from 'react';
import {ForecastContext} from '../../contexts/ForecastContext.tsx';
import countryLookup from 'country-code-lookup';

export default () => {
  const forecast = useContext(ForecastContext);

  return (
      <ListStyle>
        {forecast.cityList.list.map((city, index) => {
          const country = countryLookup.byIso(city.country);
          return (
              <ListItemStyle onClick={() => {
                forecast.cityList.select({
                  id: '',
                  name: city.name,
                  countryCode: city.country,
                  coords: {
                    latitude: city.lat,
                    longitude: city.lon
                  }
                });
              }} key={index}>
                <p>{city.state ? `${city.name} - ${city.state}` : city.name}</p>
                <p>{country?.country || city.country}</p>
              </ListItemStyle>
          );
        })}
      </ListStyle>
  );
}

const ListStyle = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
  width: 100%;
  box-sizing: border-box;
`;

const ListItemStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  background: rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in;
  max-height: 5rem;

  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(0.99);
    background: rgba(0, 0, 0, 0.4);
    box-shadow: none;
  }

  p {
    color: #fff;
    font-size: 1rem;
    font-family: 'Cantarell', sans-serif;
    margin: 0;
  }

  p:first-child {
    font-size: 1.5rem;
  }

`;