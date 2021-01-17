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

  test('Should call ViewTodos with correct filters on "active" button click', async () => {
    const viewTodosSpy = new ViewTodosSpy();
    makeSut(viewTodosSpy);

    const li = screen.getByTestId('active');

    await waitFor(() => li);

    li.click();

    await waitFor(() => screen.getByTestId('list'));

    expect(viewTodosSpy.filters).toEqual({ status: ViewTodosStatus.ACTIVE });
  });

  test('Should render all items', async () => {
    makeSut();

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(list.children).toHaveLength(4);
    expect(screen.queryByTestId('noContent')).not.toBeInTheDocument();
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
