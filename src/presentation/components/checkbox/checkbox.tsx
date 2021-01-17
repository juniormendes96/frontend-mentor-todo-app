import React, { useState } from 'react';

import { CheckboxContainer } from '@/presentation/components/checkbox/checkbox-styles';

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Checkbox: React.FC<Props> = (props: Props) => {
  const [checked, setChecked] = useState<boolean>(props.checked);

  return (
    <CheckboxContainer onClick={() => setChecked(!checked)}>
      <input type="checkbox" checked={checked} {...props} />
      <span></span>
    </CheckboxContainer>
  );
};

export default Checkbox;
