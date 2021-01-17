import React, { ReactElement } from 'react';

import App from '@/presentation/app';
import { makeLocalRemoveTodos, makeLocalSaveTodos, makeLocalViewTodos } from '@/main/factories/usecases';

export const makeApp = (): ReactElement => {
  return <App viewTodos={makeLocalViewTodos()} saveTodos={makeLocalSaveTodos()} removeTodos={makeLocalRemoveTodos()} />;
};
