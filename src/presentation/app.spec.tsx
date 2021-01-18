import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import App from '@/presentation/app';
import { RemoveTodosSpy, SaveTodosSpy, ViewTodosSpy } from '@/domain/test';
import { ViewTodosStatus } from '@/domain/usecases';

const makeSut = (viewTodosSpy = new ViewTodosSpy()): void => {
  render(<App viewTodos={viewTodosSpy} saveTodos={new SaveTodosSpy()} removeTodos={new RemoveTodosSpy()} />);
};

describe('App', () => {
  test('Should call ViewTodos', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(viewTodosSpy.callsCount).toBe(1);
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
    expect(screen.getByTestId('input')).toHaveTextContent('');

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

  test('Should call ViewTodos with correct filters on "active" button click', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

    const li = screen.getByTestId('active');

    await waitFor(() => li);

    li.click();

    await waitFor(() => screen.getByTestId('list'));

    expect(viewTodosSpy.filters).toEqual({ status: ViewTodosStatus.ACTIVE });
  });

  test('Should call ViewTodos with correct filters on "completed" button click', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

    const li = screen.getByTestId('completed');

    await waitFor(() => li);

    li.click();

    await waitFor(() => screen.getByTestId('list'));

    expect(viewTodosSpy.filters).toEqual({ status: ViewTodosStatus.COMPLETED });
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
