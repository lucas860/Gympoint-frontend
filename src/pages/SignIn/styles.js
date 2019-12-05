import styled from 'styled-components';

export const Container = styled.div`
  background: #ee4d64;
  height: 100%;
  padding: 0 20px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  background: #fff;
  width: 360px;
  min-width: 315px;
  padding: 45px 30px;
  border-radius: 4px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3);

  display: flex;
  flex-direction: column;

  img {
    align-self: center;
    width: 154px;
    height: 104px;
  }

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }

    input {
      height: 45px;
      padding: 10px;
      font-size: 16px;
      color: #999999;

      border: 1px solid #dddddd;
      border-radius: 4px;

      margin-bottom: 20px;
    }

    button {
      background: #ee4d64;
      height: 45px;
      border: none;
      border-radius: 4px;
      color: #fff;
      font-size: 16px;
      font-weight: bold;
    }
  }
`;
