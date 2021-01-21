import faker from 'faker';
import { fireEvent, screen } from '@testing-library/react';

import { darkTheme, lightTheme } from '@/presentation/styles/themes';

export const enterNewTodo = (description = faker.random.word(), checked = false): void => {
  const input = screen.getByTestId('input');
  const checkbox = screen.getAllByTestId('checkbox')[0];

  fireEvent.input(input, { target: { value: description } });

  if (checked) {
    fireEvent.click(checkbox);
  }

  fireEvent.keyUp(input, { key: 'Enter', code: 'Enter' });
};

export const testTheme = (theme: 'light' | 'dark'): void => {
  const listContainer = screen.getByTestId('listContainer');
  const body = screen.getByTestId('body');
  const backgroundImage = screen.getByTestId('backgroundImage');
  const toggleDarkModeIcon = screen.getByTestId('toggleDarkModeIcon');

  const mainBackground = theme === 'light' ? lightTheme.mainBackground : darkTheme.mainBackground;
  const bodyBackground = theme === 'light' ? lightTheme.body : darkTheme.body;
  const backgroundImageName = theme === 'light' ? 'bg-desktop-light' : 'bg-desktop-dark';
  const toggleDarkModeIconName = theme === 'light' ? 'icon-moon' : 'icon-sun';

  expect(listContainer).toHaveStyle('background: ' + mainBackground);
  expect(body).toHaveStyle('background: ' + bodyBackground);
  expect(backgroundImage.getAttribute('src')).toContain(backgroundImageName);
  expect(toggleDarkModeIcon.getAttribute('src')).toContain(toggleDarkModeIconName);
};
