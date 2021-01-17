import React from 'react';

import { TodoListItemContainer, TodoListItemDescription } from '@/presentation/components/todo-list-item/todo-list-item-styles';

import iconCross from '@/presentation/assets/icons/icon-cross.svg';
import { Checkbox } from '@/presentation/components';
import { Todo } from '@/domain/models';

type Props = {
  todo: Todo;
  onRemove?: (todoId: number) => void;
  onToggle?: (todoId: number) => void;
};

const TodoListItem: React.FC<Props> = ({ onToggle, onRemove, todo }: Props) => {
  const checkboxId = `checkbox-${todo.id}`;

  return (
    <TodoListItemContainer>
      <Checkbox id={checkboxId} checked={todo.completed} onChange={() => onToggle && onToggle(todo.id)} />
      <TodoListItemDescription disabled={todo.completed} htmlFor={checkboxId}>
        {todo.description}
      </TodoListItemDescription>
      <img src={iconCross} alt="Remove" onClick={() => onRemove && onRemove(todo.id)} />
    </TodoListItemContainer>
  );
};

export default TodoListItem;
