import styled from 'styled-components';

export const CheckboxContainer = styled.label`
  display: block;
  position: relative;
  cursor: pointer;
  height: 2.6rem;
  width: 2.6rem;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;

  input {
    position: absolute;
    opacity: 0;
    height: 0;
    width: 0;
  }

  span {
    position: absolute;
    left: 0;
    height: 2.5rem;
    width: 2.5rem;
    border: 1px solid ${({ theme }) => theme.textDisabled};
    border-radius: 50%;

    &:after {
      content: '';
      position: absolute;
      display: none;
      left: 0.75rem;
      top: 0.5rem;
      width: 0.4rem;
      height: 0.9rem;
      border: solid white;
      border-width: 0 0.3rem 0.3rem 0;
      transform: rotate(45deg);
      -webkit-transform: rotate(45deg);
      -ms-transform: rotate(45deg);
    }
  }

  &:hover input:not(:checked) ~ span {
    border: double 1px transparent;
    border-radius: 50%;
    background-image: linear-gradient(${({ theme }) => theme.mainBackground}, ${({ theme }) => theme.mainBackground}),
      radial-gradient(circle at top left, ${({ theme }) => theme.checkBackgroundPrimary}, ${({ theme }) => theme.checkBackgroundSecondary});
    background-origin: border-box;
    background-clip: content-box, border-box;
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
