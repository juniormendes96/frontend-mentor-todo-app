import { FilterTodosStatus } from '@/domain/usecases';
import React from 'react';

import { ListFooterContainer, TodoStatusOption } from './list-footer-styles';

type Props = {
  currentStatus: FilterTodosStatus;
  itemsLeft: number;
  statusClick?: (status: FilterTodosStatus) => void;
  clearCompletedClick?: () => void;
};

const ListFooter: React.FC<Props> = ({ currentStatus, itemsLeft, statusClick = () => {}, clearCompletedClick = () => {} }: Props) => {
  return (
    <ListFooterContainer>
      <span data-testid="itemsLeft">{itemsLeft} items left</span>
      <ul>
        <TodoStatusOption
          data-testid="all"
          active={currentStatus === FilterTodosStatus.ALL}
          onClick={() => statusClick(FilterTodosStatus.ALL)}
        >
          All
        </TodoStatusOption>
        <TodoStatusOption
          data-testid="active"
          active={currentStatus === FilterTodosStatus.ACTIVE}
          onClick={() => statusClick(FilterTodosStatus.ACTIVE)}
        >
          Active
        </TodoStatusOption>
        <TodoStatusOption
          data-testid="completed"
          active={currentStatus === FilterTodosStatus.COMPLETED}
          onClick={() => statusClick(FilterTodosStatus.COMPLETED)}
        >
          Completed
        </TodoStatusOption>
      </ul>
      <a data-testid="clearCompleted" onClick={() => clearCompletedClick()}>
        Clear completed
      </a>
    </ListFooterContainer>
  );
};

export default ListFooter;
