import styled from 'styled-components';

export const TableList = styled.table`
  width: 100%;
  padding: 30px;
  background: #fff;
  border-radius: 4px;

  thead tr {
    padding: 0;

    th {
      color: #444;
    }
  }

  button {
    background: none;
    border: 0;
  }
`;

export const TableLine = styled.tr`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  &:last-child {
    border: none;
    padding-bottom: 0;
  }

  th {
    width: 35%;
    text-align: left;
    font-size: 16px;

    + th {
      width: 20%;
      text-align: center;
    }

    &:last-child {
      width: 15%;
    }
  }

  td {
    width: 35%;
    color: #666;
    font-size: 16px;

    + td {
      width: 20%;
      text-align: center;
    }

    &:last-child {
      width: 15%;
      display: flex;
      justify-content: flex-end;
    }
  }
`;
