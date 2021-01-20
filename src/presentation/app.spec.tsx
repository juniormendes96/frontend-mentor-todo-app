import React from 'react';
import faker from 'faker';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '@/presentation/app';
import { RemoveTodosSpy, SaveTodosSpy, ViewTodosSpy } from '@/domain/test';
import { ViewTodosStatus } from '@/domain/usecases';
import { Helper } from './test';

type SutTypes = {
  viewTodosSpy: ViewTodosSpy;
  saveTodosSpy: SaveTodosSpy;
  removeTodosSpy: RemoveTodosSpy;
};

type SutParams = {
  viewTodosSpy?: ViewTodosSpy;
  saveTodosSpy?: SaveTodosSpy;
  removeTodosSpy?: RemoveTodosSpy;
};

const makeSut = ({
  viewTodosSpy = new ViewTodosSpy(),
  saveTodosSpy = new SaveTodosSpy(),
  removeTodosSpy = new RemoveTodosSpy()
}: SutParams = {}): SutTypes => {
  render(<App viewTodos={viewTodosSpy} saveTodos={saveTodosSpy} removeTodos={removeTodosSpy} />);

  return {
    viewTodosSpy,
    saveTodosSpy,
    removeTodosSpy
  };
};

describe('App', () => {
  test('Should call ViewTodos.filter', async () => {
    const { viewTodosSpy } = makeSut();

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(viewTodosSpy.callsCount).toBe(1);
  });

  test('Should call SaveTodos.create with correct values when not checked', async () => {
    const { saveTodosSpy } = makeSut();

    const description = faker.random.word();

    Helper.enterNewTodo(description);

    await waitFor(() => screen.getByTestId('input'));

    expect(saveTodosSpy.createCallsCount).toBe(1);
    expect(saveTodosSpy.params).toEqual({ description, completed: false });
  });

  test('Should call SaveTodos.toggle with correct id and render correctly when checked', async () => {
    const saveTodosSpy = new SaveTodosSpy();
    saveTodosSpy.completed = true;
    makeSut({ saveTodosSpy });

    const list = screen.getByTestId('list');
    await waitFor(() => list);

    const description = screen.getAllByTestId('description')[1];

    fireEvent.click(screen.getAllByTestId('checkbox')[2]);

    await waitFor(() => list);

    expect(saveTodosSpy.toggleCallsCount).toBe(1);
    expect(saveTodosSpy.id).toBe(2);
    expect(screen.getAllByTestId('checkbox')[2]).toBeChecked();
    expect(description).toHaveStyle('text-decoration: line-through');
  });

  test('Should call SaveTodos.create with correct values when checked', async () => {
    const { saveTodosSpy } = makeSut();

    const description = faker.random.word();

    Helper.enterNewTodo(description, true);

    await waitFor(() => screen.getByTestId('input'));

    expect(saveTodosSpy.createCallsCount).toBe(1);
    expect(saveTodosSpy.params).toEqual({ description, completed: true });
  });

  test('Should call RemoveTodos.remove with correct id and remove from list', async () => {
    const { removeTodosSpy } = makeSut();

    const list = screen.getByTestId('list');
    await waitFor(() => list);

    const removeButtons = screen.getAllByTestId('remove');

    fireEvent.click(removeButtons[0]);

    await waitFor(() => list);

    expect(list.children).toHaveLength(3);
    expect(removeTodosSpy.removeCallsCount).toBe(1);
    expect(removeTodosSpy.id).toBe(1);
    expect(list.querySelector('#checkbox-1')).not.toBeInTheDocument();
  });

  test('Should call RemoveTodos.clearCompleted and remove all items from list', async () => {
    const { removeTodosSpy } = makeSut();

    const clearCompleted = screen.getByTestId('clearCompleted');
    const list = screen.getByTestId('list');

    fireEvent.click(clearCompleted);

    await waitFor(() => list);

    expect(list.children).toHaveLength(2);
    expect(removeTodosSpy.clearCompletedCallsCount).toBe(1);
    expect(list.querySelector('#checkbox-3')).not.toBeInTheDocument();
    expect(list.querySelector('#checkbox-4')).not.toBeInTheDocument();
  });

  test('Should clear input after creating a new todo', async () => {
    makeSut();

    Helper.enterNewTodo();

    const input = screen.getByTestId('input');
    await waitFor(() => input);

    expect(input).toHaveValue('');
  });

  test('Should render new todo after its been created', async () => {
    makeSut();

    const list = screen.getByTestId('list');
    const description = faker.random.word();

    Helper.enterNewTodo(description);

    await waitFor(() => list);

    expect(list.children).toHaveLength(5);
    expect(screen.getAllByTestId('description')[0]).toHaveTextContent(description);
  });

  test('Should not call SaveTodos.create when no description is provided', async () => {
    const { saveTodosSpy } = makeSut();

    const input = screen.getByTestId('input');

    await waitFor(() => input);

    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(saveTodosSpy.createCallsCount).toBe(0);

    Helper.enterNewTodo('   ');

    await waitFor(() => input);

    expect(saveTodosSpy.createCallsCount).toBe(0);
  });

  test('Should render correctly on init', async () => {
    const { viewTodosSpy } = makeSut();

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

    expect(descriptions[0]).toHaveTextContent(viewTodosSpy.todos[0].description);
    expect(descriptions[1]).toHaveTextContent(viewTodosSpy.todos[1].description);
    expect(descriptions[2]).toHaveTextContent(viewTodosSpy.todos[2].description);
    expect(descriptions[3]).toHaveTextContent(viewTodosSpy.todos[3].description);

    expect(descriptions[0]).toHaveStyle('text-decoration: line-through');
    expect(descriptions[1]).toHaveStyle('text-decoration: none');
    expect(descriptions[2]).toHaveStyle('text-decoration: line-through');
    expect(descriptions[3]).toHaveStyle('text-decoration: none');

    expect(screen.queryByTestId('noContent')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('checkbox')[0]).not.toBeChecked();
  });

  test('Should render correctly on status option click', async () => {
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

  test('Should call ViewTodos with correct filters on status options click', async () => {
    const { viewTodosSpy } = makeSut();

    const liAll = screen.getByTestId('all');
    const liActive = screen.getByTestId('active');
    const liCompleted = screen.getByTestId('completed');

    liActive.click();
    expect(viewTodosSpy.filters).toEqual({ status: ViewTodosStatus.ACTIVE });

    liCompleted.click();
    expect(viewTodosSpy.filters).toEqual({ status: ViewTodosStatus.COMPLETED });

    liAll.click();
    expect(viewTodosSpy.filters).toEqual({ status: ViewTodosStatus.ALL });

    await waitFor(() => screen.getByTestId('list'));
  });

  test('Should render noContent if there are no todos created yet', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    viewTodosSpy.todos = [];

    makeSut({ viewTodosSpy });

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(list.children).toHaveLength(0);
    expect(screen.queryByTestId('noContent')).toBeInTheDocument();
  });
});
