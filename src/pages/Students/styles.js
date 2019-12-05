import styled from 'styled-components';

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px calc(10%);
`;

export const TableList = styled.table`
  width: 100%;
  background: #fff;
  border-radius: 4px;
  padding: 30px 30px;

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

    &:last-child {
      border: none;
      padding-bottom: 0;
    }

    td {
      width: 45%;

      + td {
        width: 20%;
      }

      &:nth-child(3) {
        text-align: center;
      }

      &:last-child {
        width: 15%;
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
      }
    }
  }
`;

export const Search = styled.div`
  margin-left: 20px;
  position: relative;

  input {
    width: 240px;
    height: 35px;
    padding: 10px 10px 10px 42px;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #999;
  }

  svg {
    position: absolute;
    left: 15px;
    top: 10px;

    width: 15px;
    height: 15px;
  }
`;
