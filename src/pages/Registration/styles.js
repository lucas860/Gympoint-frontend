import styled from 'styled-components';
import { Select } from '@rocketseat/unform';

export const RegisterList = styled.div`
  margin: 50px 5%;
`;

export const TableList = styled.table`
  background: #fff;
  width: 100%;
  padding: 30px 30px;
  border-radius: 4px;
  font-size: 16px;
  color: #666;

  tr {
    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 15px 0;
    border-bottom: 1px solid #eee;
    text-align: left;

    &:last-child {
      border: none;
    }

    th {
      display: flex;
      width: 25%;

      + th {
        width: 15%;
        justify-content: center;
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

export const CardSelect = styled(Select)`
  width: 100%;
  height: 45px;
  padding: 0 15px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  color: #666;

  margin-top: 10px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
`;
