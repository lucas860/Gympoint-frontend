import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border-bottom: 1px solid #dddddd;
`;

export const Content = styled.div`
  height: 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #dddddd;
    }
  }

  aside {
    text-align: right;

    strong {
      display: block;
      color: #666666;
    }

    button {
      background: none;
      border: none;
      color: #de3b3b;
    }
  }
`;

export const Menu = styled.ul`
  display: flex;

  li {
    margin-right: 20px;

    a {
      text-transform: uppercase;
      color: #999999;
      font-weight: bold;
    }
  }
`;
