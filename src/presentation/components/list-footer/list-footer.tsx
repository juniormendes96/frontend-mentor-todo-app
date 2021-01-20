import { ViewTodosStatus } from '@/domain/usecases';
import React from 'react';

import { ListFooterContainer, TodoStatusOption } from './list-footer-styles';

type Props = {
  currentStatus: ViewTodosStatus;
  itemsLeft: number;
  statusClick?: (status: ViewTodosStatus) => void;
  clearCompletedClick?: () => void;
};

const ListFooter: React.FC<Props> = ({ currentStatus, itemsLeft, statusClick = () => {}, clearCompletedClick = () => {} }: Props) => {
  return (
    <ListFooterContainer>
      <span data-testid="itemsLeft">{itemsLeft} items left</span>
      <ul>
        <TodoStatusOption data-testid="all" active={currentStatus === ViewTodosStatus.ALL} onClick={() => statusClick(ViewTodosStatus.ALL)}>
          All
        </TodoStatusOption>
        <TodoStatusOption
          data-testid="active"
          active={currentStatus === ViewTodosStatus.ACTIVE}
          onClick={() => statusClick(ViewTodosStatus.ACTIVE)}
        >
          Active
        </TodoStatusOption>
        <TodoStatusOption
          data-testid="completed"
          active={currentStatus === ViewTodosStatus.COMPLETED}
          onClick={() => statusClick(ViewTodosStatus.COMPLETED)}
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
