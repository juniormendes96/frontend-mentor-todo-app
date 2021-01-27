import React from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';

import { ListItemContainer, ListItemDescription } from '@/presentation/components/list-item/list-item-styles';

import iconCross from '@/presentation/assets/icons/icon-cross.svg';
import { Checkbox } from '@/presentation/components';
import { Todo } from '@/domain/models';

type Props = {
  todo: Todo;
  provided: DraggableProvided;
  onRemove: (todoId: number) => void;
  onToggle: (todoId: number) => void;
};

const ListItem: React.FC<Props> = ({ todo, provided, onToggle, onRemove }: Props) => {
  const checkboxId = `checkbox-${todo.id}`;

  return (
    <ListItemContainer ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
      <Checkbox id={checkboxId} checked={todo.completed} onChange={() => onToggle(todo.id)} />
      <ListItemDescription data-testid="description" disabled={todo.completed} htmlFor={checkboxId}>
        {todo.description}
      </ListItemDescription>
      <img src={iconCross} data-testid="remove" alt="Remove" onClick={() => onRemove(todo.id)} />
    </ListItemContainer>
  );
};

export default ListItem;
