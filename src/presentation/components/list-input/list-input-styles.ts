import styled from 'styled-components';

export const ListInputContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
  height: 7.4rem;
  background: ${({ theme }) => theme.mainBackground};
  padding: 0 2.5rem;
  border-radius: 0.6rem;

  input {
    outline: none;
    border: none;
    font-size: 2.2rem;
    color: ${({ theme }) => theme.text};
    background: none;
    font-weight: 400;

    &::placeholder {
      color: ${({ theme }) => theme.textDisabled};
    }
  }
`;
