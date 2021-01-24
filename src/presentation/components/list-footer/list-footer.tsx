import React from 'react';

import { FilterTodosStatus } from '@/domain/usecases';
import { ListFooterContainer, TodoStatusOption } from '@/presentation/components/list-footer/list-footer-styles';

type Props = {
  currentStatus: FilterTodosStatus;
  onStatusClick?: (status: FilterTodosStatus) => void;
};

const ListFooter: React.FC<Props> = ({ currentStatus, onStatusClick = () => {} }: Props) => {
  return (
    <ListFooterContainer>
      <ul>
        <TodoStatusOption active={currentStatus === FilterTodosStatus.ALL} onClick={() => onStatusClick(FilterTodosStatus.ALL)}>
          All
        </TodoStatusOption>
        <TodoStatusOption active={currentStatus === FilterTodosStatus.ACTIVE} onClick={() => onStatusClick(FilterTodosStatus.ACTIVE)}>
          Active
        </TodoStatusOption>
        <TodoStatusOption active={currentStatus === FilterTodosStatus.COMPLETED} onClick={() => onStatusClick(FilterTodosStatus.COMPLETED)}>
          Completed
        </TodoStatusOption>
      </ul>
    </ListFooterContainer>
  );
};

export default ListFooter;
