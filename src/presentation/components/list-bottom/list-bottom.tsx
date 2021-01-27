import React from 'react';

import { FilterTodosStatus } from '@/domain/usecases';
import { ListBottomContainer } from '@/presentation/components/list-bottom/list-bottom-styles';
import { ListStatusOptions } from '@/presentation/components';

type Props = {
  currentStatus: FilterTodosStatus;
  itemsLeft: number;
  onStatusClick?: (status: FilterTodosStatus) => void;
  onClearCompletedClick?: () => void;
};

const ListBottom: React.FC<Props> = ({ currentStatus, itemsLeft, onStatusClick = () => {}, onClearCompletedClick = () => {} }: Props) => {
  return (
    <ListBottomContainer>
      <span data-testid="itemsLeft">{itemsLeft} items left</span>
      <ListStatusOptions currentStatus={currentStatus} onStatusClick={onStatusClick} />
      <a data-testid="clearCompleted" onClick={() => onClearCompletedClick()}>
        Clear completed
      </a>
    </ListBottomContainer>
  );
};

export default ListBottom;
