import React from 'react';
import faker from 'faker';
import { fireEvent, render, RenderResult, screen } from '@testing-library/react';
import { makeDnd, DND_DRAGGABLE_DATA_ATTR, DND_DIRECTION_UP } from 'react-beautiful-dnd-test-utils';

import App from '@/presentation/app';
import {
  RemoveTodoSpy,
  ClearCompletedTodosSpy,
  CreateTodoSpy,
  ToggleTodoSpy,
  FilterTodosSpy,
  SwapTodosSpy,
  mockTodos
} from '@/domain/test';
import { FilterTodosStatus } from '@/domain/usecases';
import { Helper } from '@/presentation/test';
import * as DarkModeAdapter from '@/main/adapters/dark-mode/dark-mode-adapter';

type SutTypes = {
  filterTodosSpy: FilterTodosSpy;
  createTodoSpy: CreateTodoSpy;
  toggleTodoSpy: ToggleTodoSpy;
  removeTodoSpy: RemoveTodoSpy;
  swapTodosSpy: SwapTodosSpy;
  clearCompletedTodosSpy: ClearCompletedTodosSpy;
  renderResult: RenderResult;
};

type SutParams = {
  filterTodosSpy?: FilterTodosSpy;
};

const makeSut = ({ filterTodosSpy = new FilterTodosSpy() }: SutParams = {}): SutTypes => {
  const toggleTodoSpy = new ToggleTodoSpy();
  const createTodoSpy = new CreateTodoSpy();
  const removeTodoSpy = new RemoveTodoSpy();
  const swapTodosSpy = new SwapTodosSpy();
  const clearCompletedTodosSpy = new ClearCompletedTodosSpy();

  const renderResult = render(
    <App
      filterTodos={filterTodosSpy}
      toggleTodo={toggleTodoSpy}
      createTodo={createTodoSpy}
      removeTodo={removeTodoSpy}
      swapTodos={swapTodosSpy}
      clearCompletedTodos={clearCompletedTodosSpy}
    />
  );

  return {
    filterTodosSpy,
    toggleTodoSpy,
    createTodoSpy,
    removeTodoSpy,
    swapTodosSpy,
    clearCompletedTodosSpy,
    renderResult
  };
};

jest.mock('@/infra/cache/local-storage-adapter/local-storage-adapter');

describe('App', () => {
  test('Should call FilterTodos usecase', async () => {
    const { filterTodosSpy } = makeSut();

    await Helper.wait();

    expect(filterTodosSpy.callsCount).toBe(1);
  });

  test('Should call CreateTodo usecase with correct values when checked', async () => {
    const { createTodoSpy } = makeSut();

    const description = faker.random.word();

    Helper.enterNewTodo(description, true);

    await Helper.wait();

    expect(createTodoSpy.callsCount).toBe(1);
    expect(createTodoSpy.params).toEqual({ description, completed: true });
  });

  test('Should call CreateTodo usecase with correct values when not checked', async () => {
    const { createTodoSpy } = makeSut();

    const description = faker.random.word();

    Helper.enterNewTodo(description);

    await Helper.wait();

    expect(createTodoSpy.callsCount).toBe(1);
    expect(createTodoSpy.params).toEqual({ description, completed: false });
  });

  test('Should call ToggleTodo usecase with correct id', async () => {
    const { filterTodosSpy, toggleTodoSpy } = makeSut();

    await Helper.wait();

    fireEvent.click(screen.getAllByTestId('checkbox')[2]);

    await Helper.wait();

    expect(toggleTodoSpy.callsCount).toBe(1);
    expect(toggleTodoSpy.id).toBe(2);
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });
  });

  test('Should call RemoveTodo usecase with correct id', async () => {
    const { filterTodosSpy, removeTodoSpy } = makeSut();

    await Helper.wait();

    const removeButtons = screen.getAllByTestId('remove');

    fireEvent.click(removeButtons[0]);

    await Helper.wait();

    expect(removeTodoSpy.callsCount).toBe(1);
    expect(removeTodoSpy.id).toBe(1);
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });
  });

  test('Should call ClearCompletedTodos usecase', async () => {
    const { filterTodosSpy, clearCompletedTodosSpy } = makeSut();

    const clearCompleted = screen.getByTestId('clearCompleted');

    fireEvent.click(clearCompleted);

    await Helper.wait();

    expect(clearCompletedTodosSpy.callsCount).toBe(1);
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });
  });

  test('Should clear input after creating a new todo', async () => {
    makeSut();

    Helper.enterNewTodo();

    const input = screen.getByTestId('input');

    await Helper.wait();

    expect(input).toHaveValue('');
  });

  test('Should render new todo after it has been created', async () => {
    makeSut();

    const list = screen.getByTestId('list');
    const description = faker.random.word();

    Helper.enterNewTodo(description);

    await Helper.wait();

    expect(list.children).toHaveLength(5);
    expect(screen.getAllByTestId('description')[0]).toHaveTextContent(description);
  });

  test('Should not call CreateTodo usecase when no description is provided', async () => {
    const { createTodoSpy } = makeSut();

    await Helper.wait();

    fireEvent.keyUp(screen.getByTestId('input'), { key: 'Enter', code: 'Enter' });

    expect(createTodoSpy.callsCount).toBe(0);

    Helper.enterNewTodo('   ');

    await Helper.wait();

    expect(createTodoSpy.callsCount).toBe(0);
  });

  test('Should render correctly', async () => {
    const { filterTodosSpy } = makeSut();

    const list = screen.getByTestId('list');

    await Helper.wait();

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

    const all = screen.getAllByTestId('all')[0];
    const allMobile = screen.getAllByTestId('all')[1];

    const active = screen.getAllByTestId('active')[0];
    const activeMobile = screen.getAllByTestId('active')[1];

    const completed = screen.getAllByTestId('completed')[0];
    const completedMobile = screen.getAllByTestId('completed')[1];

    await Helper.testStatusOptionsRendering(all, active, completed);
    await Helper.testStatusOptionsRendering(allMobile, activeMobile, completedMobile);
  });

  test('Should call FilterTodos usecase with correct filters on status options click', async () => {
    const { filterTodosSpy } = makeSut();

    const all = screen.getAllByTestId('all')[0];
    const active = screen.getAllByTestId('active')[0];
    const completed = screen.getAllByTestId('completed')[0];

    active.click();
    expect(filterTodosSpy.callsCount).toBe(2);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ACTIVE });

    completed.click();
    expect(filterTodosSpy.callsCount).toBe(3);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.COMPLETED });

    all.click();
    expect(filterTodosSpy.callsCount).toBe(4);
    expect(filterTodosSpy.filters).toEqual({ status: FilterTodosStatus.ALL });

    await Helper.wait();
  });

  test('Should render noContent if there are no todos to show', async () => {
    const filterTodosSpy = new FilterTodosSpy();
    filterTodosSpy.todos = [];

    makeSut({ filterTodosSpy });

    const list = screen.getByTestId('list');

    await Helper.wait();

    expect(list.children).toHaveLength(0);
    expect(screen.queryByTestId('noContent')).toBeInTheDocument();
  });

  test('Should start with darkModeAdapter current theme', async () => {
    const getDarkModeAdapterSpy = jest.spyOn(DarkModeAdapter, 'getDarkModeAdapter').mockReturnValueOnce(true);

    makeSut();

    await Helper.wait();

    expect(getDarkModeAdapterSpy).toHaveBeenCalled();
    Helper.testTheme('dark');
  });

  test('Should switch theme on button click', async () => {
    const setDarkModeAdapterSpy = jest.spyOn(DarkModeAdapter, 'setDarkModeAdapter').mockImplementation(() => {});

    makeSut();

    const toggleDarkModeIcon = screen.getByTestId('toggleDarkModeIcon');

    fireEvent.click(toggleDarkModeIcon);
    Helper.testTheme('dark');
    expect(setDarkModeAdapterSpy).toHaveBeenCalledWith(true);

    fireEvent.click(toggleDarkModeIcon);
    Helper.testTheme('light');
    expect(setDarkModeAdapterSpy).toHaveBeenCalledWith(false);

    await Helper.wait();
  });

  test('Should call SwapTodos usecase with correct values on drag/drop', async () => {
    const filterTodosSpy = new FilterTodosSpy();
    const todos = mockTodos();
    filterTodosSpy.todos = todos;

    const { swapTodosSpy, renderResult } = makeSut({ filterTodosSpy });

    await Helper.wait();

    await Helper.dragAndDrop(renderResult, todos[2].description, 'DND_DIRECTION_UP', 1);

    expect(swapTodosSpy.callsCount).toBe(1);
    expect(swapTodosSpy.id).toBe(3);
    expect(swapTodosSpy.newPosition).toBe(1);
  });
});
