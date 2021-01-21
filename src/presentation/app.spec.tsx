import React from 'react';
import faker from 'faker';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '@/presentation/app';
import { RemoveTodoSpy, ClearCompletedTodosSpy, CreateTodoSpy, ToggleTodoSpy, FilterTodosSpy } from '@/domain/test';
import { FilterTodosStatus } from '@/domain/usecases';
import { Helper } from './test';

type SutTypes = {
  filterTodosSpy: FilterTodosSpy;
  createTodoSpy: CreateTodoSpy;
  toggleTodoSpy: ToggleTodoSpy;
  removeTodoSpy: RemoveTodoSpy;
  clearCompletedTodosSpy: ClearCompletedTodosSpy;
};

type SutParams = {
  filterTodosSpy?: FilterTodosSpy;
  createTodoSpy?: CreateTodoSpy;
  toggleTodoSpy?: ToggleTodoSpy;
  removeTodoSpy?: RemoveTodoSpy;
  clearCompletedTodosSpy?: ClearCompletedTodosSpy;
};

const makeSut = ({
  filterTodosSpy = new FilterTodosSpy(),
  toggleTodoSpy = new ToggleTodoSpy(),
  createTodoSpy = new CreateTodoSpy(),
  removeTodoSpy = new RemoveTodoSpy(),
  clearCompletedTodosSpy = new ClearCompletedTodosSpy()
}: SutParams = {}): SutTypes => {
  render(
    <App
      filterTodos={filterTodosSpy}
      toggleTodo={toggleTodoSpy}
      createTodo={createTodoSpy}
      removeTodo={removeTodoSpy}
      clearCompletedTodos={clearCompletedTodosSpy}
    />
  );

  return {
    filterTodosSpy,
    toggleTodoSpy,
    createTodoSpy,
    removeTodoSpy,
    clearCompletedTodosSpy
  };
};

describe('App', () => {
  test('Should call FilterTodos usecase', async () => {
    const { filterTodosSpy } = makeSut();

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(filterTodosSpy.callsCount).toBe(1);
  });

  test('Should call CreateTodo usecase with correct values when checked', async () => {
    const { createTodoSpy } = makeSut();

    const description = faker.random.word();

    Helper.enterNewTodo(description, true);

    await waitFor(() => screen.getByTestId('input'));

    expect(createTodoSpy.callsCount).toBe(1);
    expect(createTodoSpy.params).toEqual({ description, completed: true });
  });

  test('Should call CreateTodo usecase with correct values when not checked', async () => {
    const { createTodoSpy } = makeSut();

    const description = faker.random.word();

    Helper.enterNewTodo(description);

    await waitFor(() => screen.getByTestId('input'));

    expect(createTodoSpy.callsCount).toBe(1);
    expect(createTodoSpy.params).toEqual({ description, completed: false });
  });

  test('Should call ToggleTodo usecase with correct id', async () => {
    const { filterTodosSpy, toggleTodoSpy } = makeSut();

    const list = screen.getByTestId('list');
    await waitFor(() => list);

    fireEvent.click(screen.getAllByTestId('checkbox')[2]);

    await waitFor(() => list);

    expect(toggleTodoSpy.callsCount).toBe(1);
    expect(toggleTodoSpy.id).toBe(2);
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });
  });

  test('Should call RemoveTodo usecase with correct id', async () => {
    const { filterTodosSpy, removeTodoSpy } = makeSut();

    const list = screen.getByTestId('list');
    await waitFor(() => list);

    const removeButtons = screen.getAllByTestId('remove');

    fireEvent.click(removeButtons[0]);

    await waitFor(() => list);

    expect(removeTodoSpy.callsCount).toBe(1);
    expect(removeTodoSpy.id).toBe(1);
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });
  });

  test('Should call ClearCompletedTodos usecase', async () => {
    const { filterTodosSpy, clearCompletedTodosSpy } = makeSut();

    const clearCompleted = screen.getByTestId('clearCompleted');

    fireEvent.click(clearCompleted);

    await waitFor(() => screen.getByTestId('list'));

    expect(clearCompletedTodosSpy.callsCount).toBe(1);
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });
  });

  test('Should clear input after creating a new todo', async () => {
    makeSut();

    Helper.enterNewTodo();

    const input = screen.getByTestId('input');
    await waitFor(() => input);

    expect(input).toHaveValue('');
  });

  test('Should render new todo after it has been created', async () => {
    makeSut();

    const list = screen.getByTestId('list');
    const description = faker.random.word();

    Helper.enterNewTodo(description);

    await waitFor(() => list);

    expect(list.children).toHaveLength(5);
    expect(screen.getAllByTestId('description')[0]).toHaveTextContent(description);
  });

  test('Should not call CreateTodo usecase when no description is provided', async () => {
    const { createTodoSpy } = makeSut();

    const input = screen.getByTestId('input');

    await waitFor(() => input);

    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(createTodoSpy.callsCount).toBe(0);

    Helper.enterNewTodo('   ');

    await waitFor(() => input);

    expect(createTodoSpy.callsCount).toBe(0);
  });

  test('Should render correctly', async () => {
    const { filterTodosSpy } = makeSut();

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    const descriptions = screen.getAllByTestId('description');

    expect(list.children).toHaveLength(4);

    expect(screen.getByTestId('itemsLeft')).toHaveTextContent('2 items left');
    expect(screen.getByTestId('input')).toHaveAttribute('placeholder', 'Create a new todo...');
    expect(screen.getByTestId('input')).toHaveValue('');

    expect(list.querySelector('#checkbox-1')).toBeChecked();
    expect(list.querySelector('#checkbox-2')).not.toBeChecked();
    expect(list.querySelector('#checkbox-3')).toBeChecked();
    expect(list.querySelector('#checkbox-4')).not.toBeChecked();

    expect(descriptions[0]).toHaveTextContent(filterTodosSpy.todos[0].description);
    expect(descriptions[1]).toHaveTextContent(filterTodosSpy.todos[1].description);
    expect(descriptions[2]).toHaveTextContent(filterTodosSpy.todos[2].description);
    expect(descriptions[3]).toHaveTextContent(filterTodosSpy.todos[3].description);

    expect(descriptions[0]).toHaveStyle('text-decoration: line-through');
    expect(descriptions[1]).toHaveStyle('text-decoration: none');
    expect(descriptions[2]).toHaveStyle('text-decoration: line-through');
    expect(descriptions[3]).toHaveStyle('text-decoration: none');

    expect(screen.queryByTestId('noContent')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('checkbox')[0]).not.toBeChecked();
  });

  test('Should render options correctly', async () => {
    makeSut();

    const activeStyle = 'color: #3a7bfd';

    const list = screen.getByTestId('list');
    const liAll = screen.getByTestId('all');
    const liActive = screen.getByTestId('active');
    const liCompleted = screen.getByTestId('completed');

    expect(liAll).toHaveStyle(activeStyle);
    expect(liActive).not.toHaveStyle(activeStyle);
    expect(liCompleted).not.toHaveStyle(activeStyle);

    liActive.click();
    await waitFor(() => list);
    expect(liAll).not.toHaveStyle(activeStyle);
    expect(liActive).toHaveStyle(activeStyle);
    expect(liCompleted).not.toHaveStyle(activeStyle);

    liCompleted.click();
    await waitFor(() => list);
    expect(liAll).not.toHaveStyle(activeStyle);
    expect(liActive).not.toHaveStyle(activeStyle);
    expect(liCompleted).toHaveStyle(activeStyle);

    liAll.click();
    await waitFor(() => list);
    expect(liAll).toHaveStyle(activeStyle);
    expect(liActive).not.toHaveStyle(activeStyle);
    expect(liCompleted).not.toHaveStyle(activeStyle);
  });

  test('Should call FilterTodos usecase with correct filters on status options click', async () => {
    const { filterTodosSpy } = makeSut();

    const liAll = screen.getByTestId('all');
    const liActive = screen.getByTestId('active');
    const liCompleted = screen.getByTestId('completed');

    liActive.click();
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ACTIVE });

    liCompleted.click();
    expect(filterTodosSpy.callsCount).toBe(3);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.COMPLETED });

    liAll.click();
    expect(filterTodosSpy.callsCount).toBe(4);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });

    await waitFor(() => screen.getByTestId('list'));
  });

  test('Should render noContent if there are no todos to show', async () => {
    const filterTodosSpy = new FilterTodosSpy();
    filterTodosSpy.todos = [];

    makeSut({ filterTodosSpy });

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(list.children).toHaveLength(0);
    expect(screen.queryByTestId('noContent')).toBeInTheDocument();
  });

  test('Should start with light theme', async () => {
    makeSut();

    await waitFor(() => screen.getByTestId('list'));

    Helper.testTheme('light');
  });

  test('Should switch theme on button click', async () => {
    makeSut();

    const toggleDarkModeIcon = screen.getByTestId('toggleDarkModeIcon');

    fireEvent.click(toggleDarkModeIcon);
    Helper.testTheme('dark');

    fireEvent.click(toggleDarkModeIcon);
    Helper.testTheme('light');

    await waitFor(() => screen.getByTestId('list'));
  });
});
