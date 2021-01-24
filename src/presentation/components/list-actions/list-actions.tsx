import React from 'react';

import { FilterTodosStatus } from '@/domain/usecases';
import { ListActionsContainer, TodoStatusOption } from '@/presentation/components/list-actions/list-actions-styles';

type Props = {
  currentStatus: FilterTodosStatus;
  itemsLeft: number;
  onStatusClick?: (status: FilterTodosStatus) => void;
  onClearCompletedClick?: () => void;
};

const ListActions: React.FC<Props> = ({ currentStatus, itemsLeft, onStatusClick = () => {}, onClearCompletedClick = () => {} }: Props) => {
  return (
    <ListActionsContainer>
      <span data-testid="itemsLeft">{itemsLeft} items left</span>
      <ul>
        <TodoStatusOption
          data-testid="all"
          active={currentStatus === FilterTodosStatus.ALL}
          onClick={() => onStatusClick(FilterTodosStatus.ALL)}
        >
          All
        </TodoStatusOption>
        <TodoStatusOption
          data-testid="active"
          active={currentStatus === FilterTodosStatus.ACTIVE}
          onClick={() => onStatusClick(FilterTodosStatus.ACTIVE)}
        >
          Active
        </TodoStatusOption>
        <TodoStatusOption
          data-testid="completed"
          active={currentStatus === FilterTodosStatus.COMPLETED}
          onClick={() => onStatusClick(FilterTodosStatus.COMPLETED)}
        >
          Completed
        </TodoStatusOption>
      </ul>
      <a data-testid="clearCompleted" onClick={() => onClearCompletedClick()}>
        Clear completed
      </a>
    </ListActionsContainer>
  );
};

export default ListActions;
