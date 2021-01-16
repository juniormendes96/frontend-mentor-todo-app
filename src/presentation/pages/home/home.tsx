import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Body, BackgroundImage } from './home-styles';
import { darkTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';

const Home: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <BackgroundImage src={backgroundDesktopDark} />
      <Body />
    </ThemeProvider>
  );
};

export default Home;
