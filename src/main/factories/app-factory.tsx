import React, { ReactElement } from 'react';

import App from '@/presentation/app';
import {
  makeLocalFilterTodos,
  makeLocalCreateTodo,
  makeLocalToggleTodo,
  makeLocalRemoveTodo,
  makeLocalClearCompletedTodos
} from '@/main/factories/usecases';

export const makeApp = (): ReactElement => {
  return (
    <App
      filterTodos={makeLocalFilterTodos()}
      createTodo={makeLocalCreateTodo()}
      toggleTodo={makeLocalToggleTodo()}
      removeTodo={makeLocalRemoveTodo()}
      clearCompletedTodos={makeLocalClearCompletedTodos()}
    />
  );
};
