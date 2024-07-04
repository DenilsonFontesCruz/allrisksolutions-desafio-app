import {AuthContext} from '../contexts/AuthContext.tsx';
import {useContext, useEffect} from 'react';
import styled from 'styled-components';
import countryLookup from 'country-code-lookup';
import {ForecastContext} from '../contexts/ForecastContext.tsx';
import {ICity} from '../Api/BackendApi.ts';

export default () => {
  const auth = useContext(AuthContext);
  const forecast = useContext(ForecastContext);

  useEffect(() => {
    auth.getUserInfo();
  }, [forecast.weather.isFavorite]);

  function handleOnClick(value: ICity) {
    forecast.cityList.select(value);
  }

  return (
      <FavoriteListStyle>
        <FavoriteTitleStyle>Favorite List</FavoriteTitleStyle>
        {auth.userInfo.favoriteCities.map((city) => {
          const country = countryLookup.byIso(city.countryCode);
          return (
              <FavoriteItemStyle key={city.id} onClick={() => {
                handleOnClick(city);
              }}>
                <p>{city.name}</p>
                <p>{country?.country}</p>
              </FavoriteItemStyle>
          );
        })
        }
      </FavoriteListStyle>
  );

}

const FavoriteListStyle = styled.div`
  min-height: 30rem;
  min-width: 20rem;
  max-height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  overflow-y: scroll;
  position: relative;

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const FavoriteTitleStyle = styled.div`
  position: sticky;
  top: -1rem;
  background: rgba(51, 51, 51, 0.9);
  padding: 1.5rem;
  margin: -1rem -1rem 0 -1rem;
  color: #fff;
  font-family: 'Cantarell', sans-serif;
  font-size: 1.3rem;
`;

const FavoriteItemStyle = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
  background: rgba(255, 255, 255, 0.2);
  box-sizing: border-box;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.2s ease-in;
  max-height: 8rem;

  &:hover {
    transition: all 0.2s ease-in-out;
    transform: scale(0.99);
    background: rgba(0, 0, 0, 0.2);
    box-shadow: none;
  }

  p {
    color: ${props => props.theme.textColor};
    font-size: 1rem;
    font-family: 'Cantarell', sans-serif;
    margin: 0;
  }

  p:first-child {
    font-size: 1.5rem;
  }
`;