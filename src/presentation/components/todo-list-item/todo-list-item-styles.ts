import styled from 'styled-components';

type TodoListItemDescription = {
  disabled?: boolean;
};

export const TodoListItemContainer = styled.li`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  height: 7.4rem;
  background: ${({ theme }) => theme.mainBackground};
  padding: 0 2.5rem;

  img {
    cursor: pointer;
  }
`;

export const TodoListItemDescription = styled.label<TodoListItemDescription>`
  font-size: 2.2rem;
  color: ${({ theme, disabled }) => (disabled ? theme.textDisabled : theme.text)};
  text-decoration: ${({ disabled }) => (disabled ? 'line-through' : 'none')};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-weight: 400;
  cursor: pointer;
`;
