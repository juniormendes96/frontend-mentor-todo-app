import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable, DropResult, ResponderProvided } from 'react-beautiful-dnd';
import { ThemeProvider } from 'styled-components';

import { ListFooter, ListInput, ListItem, ListStatusOptions } from '@/presentation/components';
import { Body, Main, ListContainer, NoContent } from '@/presentation/app-styles';
import { darkTheme, lightTheme } from '@/presentation/styles/themes';
import { GlobalStyles } from '@/presentation/styles/global-styles';

import { useDarkMode } from '@/presentation/hooks';

import iconMoon from '@/presentation/assets/icons/icon-moon.svg';
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

type MainState = {
  todos: Todo[];
  currentDescription: string;
  currentStatus: FilterTodosStatus;
  currentCompletedOption: boolean;
};

const App: React.FC<Props> = (props: Props) => {
  const [darkMode, toggleDarkMode] = useDarkMode();
  const [state, setState] = useState<MainState>({
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

  const onDragEnd = (result: DropResult, provided: ResponderProvided): void => {};

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Body darkMode={darkMode} data-testid="body">
        <Main>
          <header>
            <h1>TODO</h1>
            <img
              src={darkMode ? iconSun : iconMoon}
              alt="Toggle dark mode"
              data-testid="toggleDarkModeIcon"
              onClick={() => toggleDarkMode()}
            />
          </header>
          <ListInput
            value={state.currentDescription}
            checked={state.currentCompletedOption}
            onChange={event => setState(old => ({ ...old, currentDescription: event.target.value }))}
            onKeyUp={event => event.key === 'Enter' && createTodo()}
            onCheckboxChange={checked => setState(old => ({ ...old, currentCompletedOption: checked }))}
            placeholder="Create a new todo..."
          />
          <ListContainer data-testid="listContainer">
            {!state.todos.length && <NoContent data-testid="noContent">There are no todos to show.</NoContent>}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {provided => (
                  <ul {...provided.droppableProps} ref={provided.innerRef} data-testid="list">
                    {state.todos.map((todo, index) => (
                      <Draggable key={todo.id} draggableId={String(todo.id)} index={index}>
                        {provided => <ListItem key={todo.id} todo={todo} onRemove={removeTodo} onToggle={toggleTodo} provided={provided} />}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                )}
              </Droppable>
            </DragDropContext>

            <ListFooter
              currentStatus={state.currentStatus}
              itemsLeft={state.todos.filter(todo => !todo.completed).length}
              onStatusClick={status => filterTodos({ status })}
              onClearCompletedClick={clearCompletedTodos}
            />
          </ListContainer>
          <footer>
            <ListStatusOptions currentStatus={state.currentStatus} onStatusClick={status => filterTodos({ status })} />
          </footer>
        </Main>
      </Body>
    </ThemeProvider>
  );
};

export default App;
