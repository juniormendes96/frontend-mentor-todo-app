import faker from 'faker';
import { fireEvent, screen } from '@testing-library/react';

export const enterValidTodo = (description = faker.random.word(), checked = false): void => {
  const input = screen.getByTestId('input');
  const checkbox = screen.getAllByTestId('checkbox')[0];

  fireEvent.input(input, { target: { value: description } });

  if (checked) {
    fireEvent.click(checkbox);
  }

  fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
};
