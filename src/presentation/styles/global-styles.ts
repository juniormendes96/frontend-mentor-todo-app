import { createGlobalStyle } from 'styled-components';
import { medium, large } from '@/presentation/styles/breakpoints';

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 62.5%; // 1rem = 10px
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @media (max-width: ${large}) {
      font-size: 56.25%;
    }

    @media (max-width: ${medium}) {
      font-size: 50%;
    }
  }
`;
