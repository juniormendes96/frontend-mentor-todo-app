import React from 'react';
import faker from 'faker';

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from '@/presentation/app';
import { RemoveTodosSpy, SaveTodosSpy, ViewTodosSpy } from '@/domain/test';
import { ViewTodosStatus } from '@/domain/usecases';

const makeSut = (viewTodosSpy = new ViewTodosSpy(), saveTodosSpy = new SaveTodosSpy()): void => {
  render(<App viewTodos={viewTodosSpy} saveTodos={saveTodosSpy} removeTodos={new RemoveTodosSpy()} />);
};

describe('App', () => {
  test('Should call ViewTodos.filter', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(viewTodosSpy.callsCount).toBe(1);
  });

  test('Should call SaveTodos.create with correct values', async () => {
    const saveTodosSpy = new SaveTodosSpy();
    makeSut(undefined, saveTodosSpy);

    const input = screen.getByTestId('input');

    await waitFor(() => input);

    const description = faker.random.word();

    fireEvent.input(input, { target: { value: description } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(saveTodosSpy.callsCount).toBe(1);
    expect(saveTodosSpy.params).toEqual({ description, completed: false });
  });

  test('Should not call SaveTodos.create when no description is provided', async () => {
    const saveTodosSpy = new SaveTodosSpy();
    makeSut(undefined, saveTodosSpy);

    const input = screen.getByTestId('input');

    await waitFor(() => input);

    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    expect(saveTodosSpy.callsCount).toBe(0);

    fireEvent.input(input, { target: { value: '   ' } });
    fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });

    await waitFor(() => input);

    expect(saveTodosSpy.callsCount).toBe(0);
  });

  test('Should render correctly on init', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

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
    expect(screen.getByTestId('inputCheckbox')).not.toBeChecked();
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
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

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

    makeSut(viewTodosSpy);

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(list.children).toHaveLength(0);
    expect(screen.queryByTestId('noContent')).toBeInTheDocument();
  });
});
