import React from 'react';

import { FilterTodosStatus } from '@/domain/usecases';
import { ListFooterContainer } from '@/presentation/components/list-footer/list-footer-styles';
import { ListStatusOptions } from '@/presentation/components';

type Props = {
  currentStatus: FilterTodosStatus;
  itemsLeft: number;
  onStatusClick?: (status: FilterTodosStatus) => void;
  onClearCompletedClick?: () => void;
};

const ListFooter: React.FC<Props> = ({ currentStatus, itemsLeft, onStatusClick = () => {}, onClearCompletedClick = () => {} }: Props) => {
  return (
    <ListFooterContainer>
      <span data-testid="itemsLeft">{itemsLeft} items left</span>
      <ListStatusOptions currentStatus={currentStatus} onStatusClick={onStatusClick} />
      <a data-testid="clearCompleted" onClick={() => onClearCompletedClick()}>
        Clear completed
      </a>
    </ListFooterContainer>
  );
};

export default ListFooter;
