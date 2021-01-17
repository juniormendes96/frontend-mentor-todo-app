import React from 'react';

import { TodoListItemContainer } from '@/presentation/components/todo-list-item/todo-list-item-styles';

import iconCross from '@/presentation/assets/icons/icon-cross.svg';
import { Checkbox } from '@/presentation/components';

type Props = {
  checked?: boolean;
  removable?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
  onRemove?: () => void;
};

const TodoListItem: React.FC<Props> = ({ disabled, readOnly }: Props) => {
  return (
    <TodoListItemContainer>
      <Checkbox />
      <input type="text" value="Complete online JavaScript course" disabled={disabled} readOnly={readOnly} />
      <img src={iconCross} alt="Remove" />
    </TodoListItemContainer>
  );
};

export default TodoListItem;
