import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 62.5%; // 1rem = 10px
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @media (max-width: 1200px) {
      font-size: 56.25%;
    }

    @media (max-width: 900px) {
      font-size: 50%;
    }
  }

  body {
    height: 100vh;
    width: 100vw;
  }
`;
