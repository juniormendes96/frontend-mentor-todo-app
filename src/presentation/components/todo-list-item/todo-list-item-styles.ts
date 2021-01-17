import styled from 'styled-components';

export const TodoListItemContainer = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  height: 7.4rem;
  background: ${({ theme }) => theme.mainBackground};
  padding: 0 2.5rem;

  input {
    outline: none;
    border: none;
    font-size: 2.2rem;
    color: ${({ theme }) => theme.text};
    background: none;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: 400;

    &:disabled {
      text-decoration: line-through;
      color: ${({ theme }) => theme.textDisabled};
    }
  }

  img {
    cursor: pointer;
  }
`;
