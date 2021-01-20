import React from 'react';

import { CheckboxContainer } from '@/presentation/components/checkbox/checkbox-styles';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox: React.FC<Props> = (props: Props) => {
  return (
    <CheckboxContainer>
      <input {...props} data-testid="checkbox" type="checkbox" />
      <span></span>
    </CheckboxContainer>
  );
};

export default Checkbox;
