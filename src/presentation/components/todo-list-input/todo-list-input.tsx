import React from 'react';

import { TodoListInputContainer } from './todo-list-input-styles';
import { Checkbox } from '@/presentation/components';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const TodoListInput: React.FC<Props> = (props: Props) => {
  return (
    <TodoListInputContainer>
      <Checkbox />
      <input type="text" placeholder="Create a new todo..." {...props} />
    </TodoListInputContainer>
  );
};

export default TodoListInput;
