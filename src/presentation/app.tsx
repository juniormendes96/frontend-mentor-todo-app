import React from 'react';
import { ThemeProvider } from 'styled-components';

import { TodoListItem } from '@/presentation/components';
import { Body, BackgroundImage, TodoListContainer, TodoList, TodoListFooter, TodoStatusOption } from './app-styles';
import { darkTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';
import iconSun from '@/presentation/assets/icons/icon-sun.svg';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <BackgroundImage src={backgroundDesktopDark} alt="Background image" />
      <Body />

      <TodoListContainer>
        <header>
          <h1>TODO</h1>
          <img src={iconSun} alt="Toggle dark mode" />
        </header>
        <TodoListItem />
        <TodoList>
          <ul>
            <TodoListItem readOnly />
            <TodoListItem readOnly />
            <TodoListItem readOnly />
            <TodoListItem readOnly />
            <TodoListItem readOnly />
            <TodoListItem readOnly />
          </ul>
          <TodoListFooter>
            <span>5 items left</span>
            <ul>
              <TodoStatusOption active>All</TodoStatusOption>
              <TodoStatusOption>Active</TodoStatusOption>
              <TodoStatusOption>Completed</TodoStatusOption>
            </ul>
            <a>Clear completed</a>
          </TodoListFooter>
        </TodoList>
      </TodoListContainer>
    </ThemeProvider>
  );
};

export default App;
