import React, { useRef } from 'react';

import { CheckboxContainer } from '@/presentation/components/checkbox/checkbox-styles';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox: React.FC<Props> = (props: Props) => {
  const checkboxRef = useRef<HTMLInputElement>();

  return (
    <CheckboxContainer data-testid="checkboxContainer" onClick={() => checkboxRef.current?.click()}>
      <input ref={checkboxRef} data-testid="checkbox" type="checkbox" {...props} />
      <span></span>
    </CheckboxContainer>
  );
};

export default Checkbox;
