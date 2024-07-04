import Container from './base/Container.tsx';
import styled from 'styled-components';
import {Button} from './base/Button.tsx';
import {AuthContext} from '../contexts/AuthContext.tsx';
import {useContext, useEffect} from 'react';
import {ForecastContext} from '../contexts/ForecastContext.tsx';

export default () => {
  const auth = useContext(AuthContext);
  const forecast = useContext(ForecastContext);

  useEffect(() => {
    auth.verifyIsAuthenticated();
  }, []);

  return (
      <Container $background={'#333'} $gridArea="header">
        <HeaderStyle>
          <SearchButtonStyle onClick={() => forecast.search.open()}>
            Search City...
          </SearchButtonStyle>
          {auth.isAuthenticated ? (
              <>
                <UsernameStyle>{auth.userInfo.username}</UsernameStyle>
                <Button $primary={true} onClick={() => {
                  auth.logout();
                }}>Logout</Button>
              </>
          ) : (
              <>
                <Button onClick={
                  () => {
                    auth.authModal.openAuthRegisterModal();
                  }
                }>Sign Up</Button>
                <Button $primary={true} onClick={
                  () => {
                    auth.authModal.openAuthLoginModal();
                  }
                }>Sign In</Button>
              </>)}
        </HeaderStyle>
      </Container>
  );

}

const HeaderStyle = styled.div`
  display: grid;
  padding: 1rem;
  box-sizing: border-box;
  height: 100%;
  align-content: start;
  grid-template:
      1fr / 2fr 2fr 1fr;
`;

const UsernameStyle = styled.p`
  align-content: center;
  text-align: right;
  box-sizing: border-box;
  padding: 0 2rem;
  font-size: 1.3rem;
  font-family: 'Cantarell', sans-serif;
  color: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SearchButtonStyle = styled.button`
  outline: none;
  border: none;
  text-align: start;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
  margin-right: auto;
  border-radius: 5px;
  box-sizing: border-box;
  font-family: 'Cantarell', sans-serif;
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  min-width: 10rem;
  width: 80%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    cursor: pointer;
    box-shadow: 1px 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out;
    transform: scale(1.02);
    background: rgba(255, 255, 255, 0.2);
  }
`;