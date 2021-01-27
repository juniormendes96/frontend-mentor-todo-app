import React from 'react';

import { FilterTodosStatus } from '@/domain/usecases';
import { ListStatusOptionsContainer, StatusOption } from '@/presentation/components/list-status-options/list-status-options-styles';

type Props = {
  currentStatus: FilterTodosStatus;
  onStatusClick: (status: FilterTodosStatus) => void;
};

const ListStatusOptions: React.FC<Props> = ({ currentStatus, onStatusClick }: Props) => {
  return (
    <ListStatusOptionsContainer>
      <StatusOption data-testid="all" active={currentStatus === FilterTodosStatus.ALL} onClick={() => onStatusClick(FilterTodosStatus.ALL)}>
        All
      </StatusOption>
      <StatusOption
        data-testid="active"
        active={currentStatus === FilterTodosStatus.ACTIVE}
        onClick={() => onStatusClick(FilterTodosStatus.ACTIVE)}
      >
        Active
      </StatusOption>
      <StatusOption
        data-testid="completed"
        active={currentStatus === FilterTodosStatus.COMPLETED}
        onClick={() => onStatusClick(FilterTodosStatus.COMPLETED)}
      >
        Completed
      </StatusOption>
    </ListStatusOptionsContainer>
  );
};

export default ListStatusOptions;
