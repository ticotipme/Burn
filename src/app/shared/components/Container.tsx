import React from 'react';
import { styled } from '@linaria/react';

interface ContainerProps {
  variant?: 'center' | 'space-between';
  jystify?: 'center' | 'space-between';
  main?: boolean;
}
const ContainerStyled = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  //align-items: center;
  margin: 30px 0;
  width: 100%;
  height: 100%;
  align-items: ${({ variant }) => variant};
  justify-content: ${({ jystify }) => jystify};
  width: ${({ main }) => (main ? '100%' : '914px')};
  align-content: center;
  @media (max-width: 480px){
    padding: 5px;
    max-width: 914px;
    width: 100%;
  }
  }
`;

const Container: React.FC<ContainerProps> = ({
  children, variant, main, jystify,
}) => (
  <ContainerStyled variant={variant} jystify={jystify} main={main}>
    {children}
  </ContainerStyled>
);

export default Container;
