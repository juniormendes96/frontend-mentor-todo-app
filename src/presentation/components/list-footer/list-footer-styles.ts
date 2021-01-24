import styled from 'styled-components';
import { small } from '@/presentation/styles/breakpoints';

export const ListFooterContainer = styled.footer`
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 2.5rem;
  background: ${({ theme }) => theme.mainBackground};
  border-radius: 0.6rem;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

  @media (min-width: ${small}) {
    display: none;
  }

  ul {
    list-style-type: none;

    li {
      float: left;
      border-bottom: none !important;
      cursor: pointer;
      font-size: 2rem;
      font-weight: 700;

      &:not(:last-child) {
        margin-right: 3rem;
      }
    }
  }
`;

export const TodoStatusOption = styled.li<{ active?: boolean }>`
  color: ${({ theme, active }) => (active ? theme.textActive : theme.textDisabled)};
  user-select: none;

  &:hover {
    color: ${({ theme, active }) => (active ? theme.textActive : theme.textHover)};
  }
`;
