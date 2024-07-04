import Modal from '../base/Modal.tsx';
import {useContext, useEffect, useRef} from 'react';
import {ForecastContext} from '../../contexts/ForecastContext.tsx';
import Container from '../base/Container.tsx';
import styled from 'styled-components';
// @ts-ignore
import SearchIcon from '../../assets/search.svg?react';
import ResultList from './ResultList.tsx';

export default () => {
  const forecast = useContext(ForecastContext);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current != null) {
      //@ts-ignore
      inputRef.current.focus();
    }
  }, [forecast.search.isOpen]);

  useEffect(() => {
    forecast.search.searchCity(forecast.search.value);
  }, [forecast.search.value]);

  useEffect(() => {
    forecast.search.changeValue('');
  }, [forecast.search.isOpen]);

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    forecast.search.changeValue(event.target.value);
  }

  return (
      <Modal isOpen={forecast.search.isOpen} closeModal={forecast.search.close}>
        <Container>
          <SearchContainerStyle>
            <SearchInputContainerStyle>
              <SearchInputStyle ref={inputRef} placeholder={'Search City...'}
                                value={forecast.search.value} onChange={
                (event) => {
                  handleOnChange(event);
                }
              }/>
              <SearchIconStyle/>
            </SearchInputContainerStyle>
            <ResultList/>
          </SearchContainerStyle>
        </Container>
      </Modal>
  );

}

const SearchContainerStyle = styled.div`
  display: grid;
  grid-template: 5rem 1fr / 1fr;
  width: 35rem;
  min-height: 20rem;
  height: auto;
  position: relative;
`;

const SearchInputContainerStyle = styled.div`
  display: grid;
  position: relative;
`;

const SearchInputStyle = styled.input`
  background: rgba(0, 0, 0, 0.6);
  outline: none;
  border: none;
  box-sizing: border-box;
  padding: 1rem 3.5rem;
  font-size: 1.5rem;
  color: #fff;
  font-family: 'Cantarell', sans-serif;

  &::placeholder {
    color: #fff;
  }
`;

const SearchIconStyle = styled(SearchIcon)`
  position: absolute;
  top: calc(50% - 16px);
  left: 1rem;
  fill: rgb(255, 255, 255);
  width: 32px;
  height: 32px;
`;
