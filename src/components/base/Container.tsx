import styled from 'styled-components';
import {ReactNode} from 'react';

interface IContainerProps {
  children: ReactNode;
  $gridArea?: string;
  $background?: string;
  $overflow?: { x: string, y: string };
}

export default ({$gridArea, $background, $overflow, children}: IContainerProps) => {

  return (
      <ContainerStyle $gridArea={$gridArea} $background={$background} $overflow={$overflow}>
        {children}
      </ContainerStyle>
  );
}


const ContainerStyle = styled.div<{
      $gridArea?: string,
      $background?: string,
      $overflow?: { x: string, y: string }
    }>`
      display: grid;
      grid-area: ${({$gridArea}) => $gridArea || 'auto'};
      height: 100%;
      box-sizing: border-box;
      min-width: auto;
      min-height: auto;
      background: ${({$background}) => $background || 'rgba(255, 255, 255, 0.12)'};
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow-x: ${({$overflow}) => $overflow?.x || 'auto'};
      overflow-y: ${({$overflow}) => $overflow?.y || 'auto'};
    `
;


