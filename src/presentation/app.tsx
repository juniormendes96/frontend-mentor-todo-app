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
import {
  FilterTodos,
  CreateTodo,
  ToggleTodo,
  RemoveTodo,
  ClearCompletedTodos,
  FilterTodosStatus,
  FilterTodosFilters
} from '@/domain/usecases';

type Props = {
  filterTodos: FilterTodos;
  createTodo: CreateTodo;
  toggleTodo: ToggleTodo;
  removeTodo: RemoveTodo;
  clearCompletedTodos: ClearCompletedTodos;
};

type State = {
  todos: Todo[];
  currentDescription: string;
  currentStatus: FilterTodosStatus;
  currentCompletedOption: boolean;
};

const App: React.FC<Props> = (props: Props) => {
  const [state, setState] = useState<State>({
    todos: [],
    currentDescription: '',
    currentStatus: FilterTodosStatus.ALL,
    currentCompletedOption: false
  });

  useEffect(() => {
    filterTodosWithCurrentStatus();
  }, []);

  const filterTodos = async (filters: FilterTodosFilters): Promise<void> => {
    const todos = await props.filterTodos.invoke(filters);
    setState(old => ({ ...old, todos, currentStatus: filters.status }));
  };

  const filterTodosWithCurrentStatus = async (): Promise<void> => {
    filterTodos({ status: state.currentStatus });
  };

  const createTodo = async (): Promise<void> => {
    const { currentDescription = '', currentCompletedOption } = state;
    if (currentDescription.trim()) {
      const newTodo = await props.createTodo.invoke({ description: currentDescription, completed: currentCompletedOption });
      setState(old => ({ ...old, currentDescription: '', todos: [newTodo, ...old.todos] }));
    }
  };

  const removeTodo = async (id: number): Promise<void> => {
    await props.removeTodo.invoke(id);
    await filterTodosWithCurrentStatus();
  };

  const clearCompletedTodos = async (): Promise<void> => {
    await props.clearCompletedTodos.invoke();
    await filterTodosWithCurrentStatus();
  };

  const toggleTodo = async (id: number): Promise<void> => {
    await props.toggleTodo.invoke(id);
    await filterTodosWithCurrentStatus();
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
