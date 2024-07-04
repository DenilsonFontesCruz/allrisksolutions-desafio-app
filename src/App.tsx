import {checkHealth} from './Api/BackendApi.ts';
import {AuthProvider} from './contexts/AuthContext.tsx';
import styled, {ThemeProvider} from 'styled-components';
import {ClimateThemesBackground} from './settings/theme.tsx';
import Container from './components/base/Container.tsx';
import Header from './components/Header.tsx';
import {useEffect, useState} from 'react';
import PageError from './components/base/PageError.tsx';
import AuthModal from './components/AuthModal/AuthModal.tsx';
import {ForecastProvider} from './contexts/ForecastContext.tsx';
import SearchModal from './components/SearchModal/SearchModal.tsx';
import ForecastDetails from './components/ForecastDetails/ForecastDetails.tsx';
import FavoriteList from './components/FavoriteList.tsx';

export interface ITheme {
  textColor: string;
  backgroundColor: ClimateThemesBackground;
}

function App() {
  const [isHealthy, setIsHealthy] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [theme, setTheme] = useState<ITheme>({
    textColor: '#333',
    backgroundColor: ClimateThemesBackground.Clear
  });

  function changeTheme(theme: ITheme) {
    setTheme(theme);
  }

  useEffect(() => {
    checkHealth().then(() => {
      setIsHealthy(true);
    }).catch(() => {
      setIsHealthy(false);
    });
  }, []);

  return (
      <ThemeProvider theme={theme}>
        {isHealthy ? (
            <AuthProvider>
              <ForecastProvider changeTheme={changeTheme}>
                <Page>
                  <Header/>
                  <Container $gridArea={'favorite'} $overflow={{x: 'hidden', y: 'auto'}}>
                    <FavoriteList/>
                  </Container>
                  <Container $gridArea={'climate'} $overflow={{x: 'hidden', y: 'auto'}}>
                    <ForecastDetails/>
                  </Container>
                </Page>
                <AuthModal/>
                <SearchModal/>
              </ForecastProvider>
            </AuthProvider>) : (
            <PageError message="Api not working. Please try again later."/>
        )}
      </ThemeProvider>
  );
}


const Page = styled.div`
  display: grid;
  grid-template:
      "header header" 6rem
      "favorite climate" 45rem
      / 1fr 1fr;
  justify-content: center;
  align-items: center;
  height: auto;
  min-height: 100vh;
  width: 100%;
  padding: 3rem 10rem;
  gap: 3rem;
  box-sizing: border-box;
  background: ${props => props.theme.backgroundColor || ClimateThemesBackground.Clear};

  @media (max-width: 1366px) {
    grid-template:
      "header" 6rem
      "favorite" 1fr
      "climate" 1fr
      / 1fr;
  }

  @media (max-width: 768px) {
    padding: 3rem 1rem;
  }
`;


export default App;
