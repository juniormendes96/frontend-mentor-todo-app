import React from 'react';

import { ListInputContainer } from './list-input-styles';
import { Checkbox } from '@/presentation/components';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const ListInput: React.FC<Props> = (props: Props) => {
  return (
    <ListInputContainer>
      <Checkbox />
      <input type="text" {...props} />
    </ListInputContainer>
  );
};

export default ListInput;
