import styled from 'styled-components';

export default ({message}: { message: string }) => {
  return (
      <PageErrorStyle>
        <h1>{message}</h1>
      </PageErrorStyle>
  );
}

const PageErrorStyle = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;

  h1 {
    font-size: 2rem;
  }
`;