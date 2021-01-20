import styled from 'styled-components';

export const ListFooterContainer = styled.footer`
  height: 7rem;
  border-top: 1px solid ${({ theme }) => theme.textDisabled};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;

  * {
    font-size: 1.7rem;
  }

  span,
  a {
    color: ${({ theme }) => theme.textDisabled};
  }

  ul {
    list-style-type: none;

    li {
      float: left;
      border-bottom: none !important;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: 3rem;
      }
    }
  }

  a {
    cursor: pointer;

    &:hover {
      color: ${({ theme }) => theme.textHover};
    }
  }
`;

export const TodoStatusOption = styled.li<{ active?: boolean }>`
  color: ${({ theme, active }) => (active ? theme.textActive : theme.textDisabled)};

  &:hover {
    color: ${({ theme, active }) => (active ? theme.textActive : theme.textHover)};
  }
`;
