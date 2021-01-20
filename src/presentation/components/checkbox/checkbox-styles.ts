import styled from 'styled-components';

export const CheckboxContainer = styled.div`
  height: 2.5rem;
  width: 2.5rem;
  position: relative;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 100%;
    width: 100%;
    z-index: 2;
  }

  span {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border: 1px solid ${({ theme }) => theme.textDisabled};
    border-radius: 50%;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 7.5px;
      top: 5px;
      width: 4px;
      height: 9px;
      border: solid white;
      border-width: 0 3px 3px 0;
      transform: rotate(45deg);
    }
  }

  &:hover input:not(:checked) ~ span {
    // linear-gradient border
  }

  input:checked ~ span {
    background-image: linear-gradient(
      to bottom right,
      ${({ theme }) => theme.checkBackgroundPrimary},
      ${({ theme }) => theme.checkBackgroundSecondary}
    );
  }

  input:checked ~ span:after {
    display: block;
  }
`;
