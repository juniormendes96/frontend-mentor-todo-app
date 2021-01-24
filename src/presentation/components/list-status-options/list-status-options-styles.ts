import styled from 'styled-components';
import { small } from '@/presentation/styles/breakpoints';

export const ListStatusOptionsContainer = styled.ul`
  list-style-type: none;

  li {
    float: left;
    border-bottom: none !important;
    font-size: 1.7rem;
    user-select: none;
    cursor: pointer;

    &:not(:last-child) {
      margin-right: 3rem;
    }

    @media (max-width: ${small}) {
      font-size: 2rem;
      font-weight: 700;
    }
  }
`;

export const StatusOption = styled.li<{ active?: boolean }>`
  color: ${({ theme, active }) => (active ? theme.textActive : theme.textDisabled)};

  &:hover {
    color: ${({ theme, active }) => (active ? theme.textActive : theme.textHover)};
  }
`;
