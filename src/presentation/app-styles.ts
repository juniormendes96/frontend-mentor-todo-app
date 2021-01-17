import styled from 'styled-components';

export const Body = styled.div`
  height: 65vh;
  background: ${({ theme }) => theme.body};
`;

export const BackgroundImage = styled.img`
  display: block;
  height: 35vh;
  width: 100%;
`;

export const ListContainer = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.5rem;
  height: 70vh;
  width: 40vw;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 1350px) {
    width: 60vw;
  }

  @media (max-width: 900px) {
    width: 90vw;
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
    }
  }
`;

export const List = styled.div`
  display: grid;
  grid-template-rows: 1fr auto;
  background: ${({ theme }) => theme.mainBackground};
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
  border-radius: 0.6rem;
  overflow: hidden;

  ul {
    overflow-y: overlay;

    &::-webkit-scrollbar {
      width: 14px;
      height: 18px;
    }

    &::-webkit-scrollbar-thumb {
      height: 6px;
      border: 4px solid rgba(0, 0, 0, 0);
      background-clip: padding-box;
      border-radius: 7px;
      background-color: ${({ theme }) => theme.scrollbarThumb};
      box-shadow: inset -1px -1px 0px rgba(0, 0, 0, 0.05), inset 1px 1px 0px rgba(0, 0, 0, 0.05);
    }

    &::-webkit-scrollbar-button {
      width: 0;
      height: 0;
      display: none;
    }

    & > *:not(:last-child) {
      border-bottom: 1px solid ${({ theme }) => theme.textDisabled};
    }
  }
`;

export const ListFooter = styled.footer`
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

      &:hover {
        color: ${({ theme }) => theme.textHover};
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
`;
