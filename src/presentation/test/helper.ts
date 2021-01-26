import faker from 'faker';
import { fireEvent, screen, waitFor } from '@testing-library/react';

import { darkTheme, lightTheme } from '@/presentation/styles/themes';

export const wait = () => waitFor(() => screen.getByTestId('list'));

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
  const toggleDarkModeIcon = screen.getByTestId('toggleDarkModeIcon');

  const mainBackground = theme === 'light' ? lightTheme.mainBackground : darkTheme.mainBackground;
  const bodyBackground = theme === 'light' ? lightTheme.body : darkTheme.body;
  const backgroundImageName = theme === 'light' ? 'bg-desktop-light' : 'bg-desktop-dark';
  const toggleDarkModeIconName = theme === 'light' ? 'icon-moon' : 'icon-sun';

  expect(listContainer).toHaveStyle('background: ' + mainBackground);
  expect(body).toHaveStyle('background: ' + bodyBackground);
  expect(body).toHaveStyle(`background-image: url(${backgroundImageName}.jpg)`);
  expect(toggleDarkModeIcon.getAttribute('src')).toContain(toggleDarkModeIconName);
};

export const testStatusOptionsRendering = async (all: HTMLElement, active: HTMLElement, completed: HTMLElement): Promise<void> => {
  const activeStyle = 'color: #3a7bfd';

  expect(all).toHaveStyle(activeStyle);
  expect(active).not.toHaveStyle(activeStyle);
  expect(completed).not.toHaveStyle(activeStyle);

  fireEvent.click(active);
  await wait();
  expect(all).not.toHaveStyle(activeStyle);
  expect(active).toHaveStyle(activeStyle);
  expect(completed).not.toHaveStyle(activeStyle);

  fireEvent.click(completed);
  await wait();
  expect(all).not.toHaveStyle(activeStyle);
  expect(active).not.toHaveStyle(activeStyle);
  expect(completed).toHaveStyle(activeStyle);

  fireEvent.click(all);
  await wait();
  expect(all).toHaveStyle(activeStyle);
  expect(active).not.toHaveStyle(activeStyle);
  expect(completed).not.toHaveStyle(activeStyle);
};
