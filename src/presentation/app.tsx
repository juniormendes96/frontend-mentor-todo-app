import React from 'react';
import { ThemeProvider } from 'styled-components';

import { ListInput, ListItem } from '@/presentation/components';
import { Body, BackgroundImage, ListContainer, List, ListFooter, TodoStatusOption } from './app-styles';
import { darkTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';
import iconSun from '@/presentation/assets/icons/icon-sun.svg';
import { Todo } from '@/domain/models';
import { RemoveTodos, SaveTodos, ViewTodos } from '@/domain/usecases';

const todo: Todo = {
  id: 1,
  completed: false,
  description: 'Complete online JavaScript course'
};

type Props = {
  viewTodos: ViewTodos;
  saveTodos: SaveTodos;
  removeTodos: RemoveTodos;
};

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <BackgroundImage src={backgroundDesktopDark} alt="Background image" />
      <Body />

      <ListContainer>
        <header>
          <h1>TODO</h1>
          <img src={iconSun} alt="Toggle dark mode" />
        </header>
        <ListInput placeholder="Create a new todo..." />
        <List>
          <ul>
            <ListItem todo={todo} />
            <ListItem todo={todo} />
            <ListItem todo={todo} />
            <ListItem todo={todo} />
            <ListItem todo={todo} />
            <ListItem todo={todo} />
          </ul>
          <ListFooter>
            <span>5 items left</span>
            <ul>
              <TodoStatusOption active>All</TodoStatusOption>
              <TodoStatusOption>Active</TodoStatusOption>
              <TodoStatusOption>Completed</TodoStatusOption>
            </ul>
            <a>Clear completed</a>
          </ListFooter>
        </List>
      </ListContainer>
    </ThemeProvider>
  );
};

export default App;
