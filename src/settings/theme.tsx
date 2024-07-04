import {ITheme} from '../App.tsx';

//@ts-ignore
import ThunderstormSvg from '../assets/thunderstorm.svg?react';
//@ts-ignore
import DrizzleSvg from '../assets/drizzle.svg?react';
//@ts-ignore
import RainSvg from '../assets/rain.svg?react';
//@ts-ignore
import SnowSvg from '../assets/snow.svg?react';
//@ts-ignore
import AtmosphereSvg from '../assets/atmosphere.svg?react';
//@ts-ignore
import ClearSvg from '../assets/clear.svg?react';
//@ts-ignore
import CloudsSvg from '../assets/clouds.svg?react';
import {ReactElement} from 'react';

export enum ClimateThemesBackground {
  Thunderstorm = 'linear-gradient(117deg, rgba(0,0,0,1) 0%, rgba(67,67,67,1) 46%, rgba(255,255,255,1) 100%)',
  Drizzle = 'linear-gradient(117deg, rgba(224,224,224,1) 0%, rgba(192,192,192,1) 46%, rgba(160,160,160,1) 100%)',
  Rain = 'linear-gradient(117deg, rgba(105,105,105,1) 0%, rgba(72,72,72,1) 46%, rgba(32,32,32,1) 100%)',
  Snow = 'linear-gradient(117deg, rgba(240,240,240,1) 0%, rgba(255,255,255,1) 46%, rgba(230,230,230,1) 100%)',
  Atmosphere = 'linear-gradient(117deg, rgba(176,196,222,1) 0%, rgba(135,206,235,1) 46%, rgba(176,196,222,1) 100%)',
  Clear = 'linear-gradient(117deg, rgba(135,206,250,1) 0%, rgba(0,191,255,1) 46%, rgba(135,206,250,1) 100%)',
  Clouds = 'linear-gradient(117deg, rgba(201,201,201,1) 0%, rgba(169,169,169,1) 46%, rgba(201,201,201,1) 100%)'
}

export const getTheme =
    (code: number): ITheme => {
      switch (code) {
        case 1:
          return {
            textColor: '#fff',
            backgroundColor: ClimateThemesBackground.Thunderstorm
          };
        case 2:
          return {
            textColor: '#333',
            backgroundColor: ClimateThemesBackground.Drizzle
          };
        case 3:
          return {
            textColor: '#fff',
            backgroundColor: ClimateThemesBackground.Rain
          };
        case 4:
          return {
            textColor: '#333',
            backgroundColor: ClimateThemesBackground.Snow
          };
        case 5:
          return {
            textColor: '#fff',
            backgroundColor: ClimateThemesBackground.Atmosphere
          };
        case 6:
          return {
            textColor: '#333',
            backgroundColor: ClimateThemesBackground.Clouds
          };
        case 7:
          return {
            textColor: '#fff',
            backgroundColor: ClimateThemesBackground.Clear
          };
        default:
          return {
            textColor: '#fff',
            backgroundColor: ClimateThemesBackground.Clear
          };
      }
    };

export const getWeatherIcon = (code: number): ReactElement => {
  switch (code) {
    case 1:
      return <ThunderstormSvg/>;
    case 2:
      return <DrizzleSvg/>;
    case 3:
      return <RainSvg/>;
    case 4:
      return <SnowSvg/>;
    case 5:
      return <AtmosphereSvg/>;
    case 6:
      return <CloudsSvg/>;
    case 7:
      return <ClearSvg/>;
    default:
      return <ClearSvg/>;
  }
};

