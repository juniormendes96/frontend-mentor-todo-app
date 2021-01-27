import styled from 'styled-components';
import { small, medium, large } from '@/presentation/styles/breakpoints';

import backgroundDesktopLight from '@/presentation/assets/images/bg-desktop-light.jpg';
import backgroundDesktopDark from '@/presentation/assets/images/bg-desktop-dark.jpg';
import backgroundMobileLight from '@/presentation/assets/images/bg-mobile-light.jpg';
import backgroundMobileDark from '@/presentation/assets/images/bg-mobile-dark.jpg';

export const Body = styled.div<{ darkMode: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.body};
  background-image: url(${({ darkMode }) => (darkMode ? backgroundDesktopDark : backgroundDesktopLight)});
  background-repeat: no-repeat;
  background-size: 100vw 38vh;

  @media (max-width: ${small}) {
    background-image: url(${({ darkMode }) => (darkMode ? backgroundMobileDark : backgroundMobileLight)});
  }
`;

export const Main = styled.main`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.5rem;
  height: 70vh;
  width: 40vw;

  @media (max-width: ${large}) {
    width: 60vw;
  }

  @media (max-width: ${medium}) {
    width: 90vw;
  }

  @media (max-width: ${small}) {
    height: 85vh;
  }

  header {
    display: flex;
    justify-content: space-between;

    h1 {
      font-size: 4rem;
      font-weight: 700;
      letter-spacing: 1.5rem;
      color: ${({ theme }) => theme.title};
    }

    img {
      width: 3rem;
      height: 3rem;
      cursor: pointer;
    }
  }

  footer {
    display: none;
    height: 7rem;
    align-items: center;
    justify-content: center;
    padding: 0 2.5rem;
    background: ${({ theme }) => theme.mainBackground};
    border-radius: 0.6rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;

    @media (max-width: ${small}) {
      display: flex;
    }
  }
`;
