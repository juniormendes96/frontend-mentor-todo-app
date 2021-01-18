import React from 'react';

import { ListInputContainer } from './list-input-styles';
import { Checkbox } from '@/presentation/components';

type Props = {
  checked?: boolean;
  onCheckboxChange?: (checked: boolean) => void;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const ListInput: React.FC<Props> = ({ checked = false, onCheckboxChange = () => {}, ...props }: Props) => {
  return (
    <ListInputContainer>
      <Checkbox checked={checked} onChange={event => onCheckboxChange(event.target.checked)} />
      <input data-testid="input" type="text" {...props} />
    </ListInputContainer>
  );
};

export default ListInput;
