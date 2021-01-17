import React from 'react';

import { render, screen, waitFor } from '@testing-library/react';
import App from '@/presentation/app';
import { RemoveTodosSpy, SaveTodosSpy, ViewTodosSpy } from '@/domain/test';

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

  test('Should render all items', async () => {
    makeSut();

    const list = screen.getByTestId('list');

    await waitFor(() => list);

    expect(list.children).toHaveLength(4);
    expect(screen.queryByTestId('noContent')).not.toBeInTheDocument();
  });
});
