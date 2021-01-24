import styled from 'styled-components';

import { ListStatusOptionsContainer } from '@/presentation/components/list-status-options/list-status-options-styles';
import { small } from '@/presentation/styles/breakpoints';

export const ListFooterContainer = styled.div`
  height: 7rem;
  border-top: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.5rem;

  span,
  a {
    color: ${({ theme }) => theme.textDisabled};
    font-size: 1.7rem;
  }

  a {
    cursor: pointer;
    user-select: none;

    &:hover {
      color: ${({ theme }) => theme.textHover};
    }
  }

  @media (max-width: ${small}) {
    ${ListStatusOptionsContainer} {
      display: none;
    }
  }
`;
