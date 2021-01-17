import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { ListInput, ListItem } from '@/presentation/components';
import { Body, BackgroundImage, AppContainer, ListContainer, ListFooter, TodoStatusOption, NoContent } from './app-styles';
import { darkTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';
import iconSun from '@/presentation/assets/icons/icon-sun.svg';
import { Todo } from '@/domain/models';
import { RemoveTodos, SaveTodos, ViewTodos, ViewTodosFilters, ViewTodosStatus } from '@/domain/usecases';

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

type State = {
  todos: Todo[];
};

const App: React.FC<Props> = ({ viewTodos }: Props) => {
  const [state, setState] = useState<State>({
    todos: []
  });

  useEffect(() => {
    filterTodos({});
  }, []);

  const filterTodos = async (filters: ViewTodosFilters): Promise<void> => {
    const todos = await viewTodos.filter(filters);
    setState(old => ({ ...old, todos }));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <BackgroundImage src={backgroundDesktopDark} alt="Background image" />
      <Body />

      <AppContainer>
        <header>
          <h1>TODO</h1>
          <img src={iconSun} alt="Toggle dark mode" />
        </header>
        <ListInput placeholder="Create a new todo..." />
        <ListContainer>
          {!state.todos.length && <NoContent data-testid="noContent">There are no todos created yet.</NoContent>}
          <ul data-testid="list">
            {state.todos.map(todo => (
              <ListItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <ListFooter>
            <span>5 items left</span>
            <ul>
              <TodoStatusOption active>All</TodoStatusOption>
              <TodoStatusOption data-testid="active" onClick={() => filterTodos({ status: ViewTodosStatus.ACTIVE })}>
                Active
              </TodoStatusOption>
              <TodoStatusOption>Completed</TodoStatusOption>
            </ul>
            <a>Clear completed</a>
          </ListFooter>
        </ListContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
