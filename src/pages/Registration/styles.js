import styled from 'styled-components';

export const RegisterList = styled.div`
  margin: 50px 5%;
`;

export const TableList = styled.table`
  background: #fff;
  width: 100%;
  padding: 30px;
  border-radius: 4px;
  font-size: 16px;
  color: #666;

  thead {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    font-weight: bold;

    tr {
      padding: 0;
    }
  }

  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 0;
    border-bottom: 1px solid #eee;
    text-align: left;

    &:last-child {
      border: none;
      padding-bottom: 0;
    }

    th {
      display: flex;
      width: 25%;

      + th {
        width: 15%;
        justify-content: center;
        text-align: center;
      }

      &:nth-child(4) {
        width: 10%;
      }

      &:last-child {
        width: 5%;
      }
    }

    td {
      display: flex;
      width: 25%;

      + td {
        width: 15%;
        justify-content: center;
        text-align: center;
      }

      &:nth-child(4) {
        width: 10%;
      }

      &:last-child {
        width: 5%;
        justify-content: flex-end;
      }
    }
  }
`;

export const BoxDatePicker = styled.div`
  strong {
    margin-bottom: 10px;
  }

  input {
    height: 45px;
    padding: 0 20px;
    color: #666;
  }

  fieldset {
    border: 1px solid #ddd;
  }
`;
