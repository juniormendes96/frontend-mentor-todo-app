import React from 'react';
import { ThemeProvider } from 'styled-components';

import { HomeContainer } from './home-styles';
import { lightTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles />
      <HomeContainer>Hello world</HomeContainer>
    </ThemeProvider>
  );
};

export default Home;
