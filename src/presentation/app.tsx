import React, { SyntheticEvent, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';

import { ListFooter, ListInput, ListItem } from '@/presentation/components';
import { Body, BackgroundImageContainer, AppContainer, ListContainer, NoContent } from './app-styles';
import { darkTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';
import backgroundMobileDark from '@/presentation/assets/images/bg-mobile-dark.jpg';
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
  currentCompletedOption: boolean;
};

const App: React.FC<Props> = ({ viewTodos, saveTodos, removeTodos }: Props) => {
  const [state, setState] = useState<State>({
    todos: [],
    currentDescription: '',
    currentStatus: ViewTodosStatus.ALL,
    currentCompletedOption: false
  });

  useEffect(() => {
    filterTodos({ status: state.currentStatus });
  }, []);

  const filterTodos = async (filters: ViewTodosFilters): Promise<void> => {
    const todos = await viewTodos.filter(filters);
    setState(old => ({ ...old, todos, currentStatus: filters.status }));
  };

  const createTodo = async (): Promise<void> => {
    const { currentDescription = '', currentCompletedOption } = state;
    if (currentDescription.trim()) {
      const newTodo = await saveTodos.create({ description: currentDescription, completed: currentCompletedOption });
      setState(old => ({ ...old, currentDescription: '', todos: [newTodo, ...old.todos] }));
    }
  };

  const removeTodo = async (id: number): Promise<void> => {
    await removeTodos.remove(id);
    await filterTodos({ status: state.currentStatus });
  };

  const clearCompletedTodos = async (): Promise<void> => {
    await removeTodos.clearCompleted();
    await filterTodos({ status: state.currentStatus });
  };

  const toggleTodo = async (id: number): Promise<void> => {
    await saveTodos.toggle(id);
    await filterTodos({ status: state.currentStatus });
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <BackgroundImageContainer>
        <picture>
          <source media="(max-width: 650px)" srcSet={backgroundMobileDark} />
          <img src={backgroundDesktopDark} alt="Background image" />
        </picture>
      </BackgroundImageContainer>

      <Body />

      <AppContainer>
        <header>
          <h1>TODO</h1>
          <img src={iconSun} alt="Toggle dark mode" />
        </header>
        <ListInput
          value={state.currentDescription}
          checked={state.currentCompletedOption}
          onChange={event => setState(old => ({ ...old, currentDescription: event.target.value }))}
          onKeyUp={event => event.key === 'Enter' && createTodo()}
          onCheckboxChange={checked => setState(old => ({ ...old, currentCompletedOption: checked }))}
          placeholder="Create a new todo..."
        />
        <ListContainer>
          {!state.todos.length && <NoContent data-testid="noContent">There are no todos to show.</NoContent>}
          <ul data-testid="list">
            {state.todos.map(todo => (
              <ListItem key={todo.id} todo={todo} onRemove={removeTodo} onToggle={toggleTodo} />
            ))}
          </ul>
          <ListFooter
            currentStatus={state.currentStatus}
            itemsLeft={state.todos.filter(todo => !todo.completed).length}
            statusClick={status => filterTodos({ status })}
            clearCompletedClick={clearCompletedTodos}
          />
        </ListContainer>
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
