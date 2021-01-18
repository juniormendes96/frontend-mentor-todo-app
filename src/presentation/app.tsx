import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { ListInput, ListItem } from '@/presentation/components';
import { Body, BackgroundImage, AppContainer, ListContainer, ListFooter, TodoStatusOption, NoContent } from './app-styles';
import { darkTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';
import iconSun from '@/presentation/assets/icons/icon-sun.svg';
import { Todo } from '@/domain/models';
import { RemoveTodos, SaveTodos, ViewTodos, ViewTodosFilters, ViewTodosStatus } from '@/domain/usecases';

type Props = {
  viewTodos: ViewTodos;
  saveTodos: SaveTodos;
  removeTodos: RemoveTodos;
};

type State = {
  todos: Todo[];
  currentDescription: string;
  currentStatus: ViewTodosStatus;
};

const App: React.FC<Props> = ({ viewTodos, saveTodos }: Props) => {
  const [state, setState] = useState<State>({
    todos: [],
    currentDescription: '',
    currentStatus: ViewTodosStatus.ALL
  });

  useEffect(() => {
    filterTodos({ status: state.currentStatus });
  }, []);

  const filterTodos = async (filters: ViewTodosFilters): Promise<void> => {
    const todos = await viewTodos.filter(filters);
    setState(old => ({ ...old, todos, currentStatus: filters.status }));
  };

  const createTodo = async (): Promise<void> => {
    const { currentDescription = '' } = state;
    if (currentDescription.trim()) {
      await saveTodos.create({ description: currentDescription, completed: false });
      setState(old => ({ ...old, currentDescription: '' }));
    }
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
        <ListInput
          value={state.currentDescription}
          onChange={event => setState(old => ({ ...old, currentDescription: event.target.value }))}
          onKeyUp={event => event.key === 'Enter' && createTodo()}
          placeholder="Create a new todo..."
        />
        <ListContainer>
          {!state.todos.length && <NoContent data-testid="noContent">There are no todos created yet.</NoContent>}
          <ul data-testid="list">
            {state.todos.map(todo => (
              <ListItem key={todo.id} todo={todo} />
            ))}
          </ul>
          <ListFooter>
            <span data-testid="itemsLeft">{state.todos.filter(todo => !todo.completed).length} items left</span>
            <ul>
              <TodoStatusOption
                data-testid="all"
                active={state.currentStatus === ViewTodosStatus.ALL}
                onClick={() => filterTodos({ status: ViewTodosStatus.ALL })}
              >
                All
              </TodoStatusOption>
              <TodoStatusOption
                data-testid="active"
                active={state.currentStatus === ViewTodosStatus.ACTIVE}
                onClick={() => filterTodos({ status: ViewTodosStatus.ACTIVE })}
              >
                Active
              </TodoStatusOption>
              <TodoStatusOption
                data-testid="completed"
                active={state.currentStatus === ViewTodosStatus.COMPLETED}
                onClick={() => filterTodos({ status: ViewTodosStatus.COMPLETED })}
              >
                Completed
              </TodoStatusOption>
            </ul>
            <a>Clear completed</a>
          </ListFooter>
        </ListContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
