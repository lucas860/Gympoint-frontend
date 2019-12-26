import styled from 'styled-components';

export const HelpContainer = styled.div`
  margin: 50px 30%;
`;

export const Header = styled.header`
  margin-bottom: 20px;

  h1 {
    color: #444;
  }
`;

export const HelpList = styled.table`
  width: 100%;
  background: #fff;
  padding: 30px;
  border-radius: 4px;
  font-size: 16px;

  thead tr {
    padding: 0;
    margin-bottom: 10px;
    text-align: left;
    border: none;
  }

  tr {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    &:last-child {
      padding-bottom: 0;
      border: none;
    }

    td {
      color: #666;
    }
  }
`;

export const AnswerButton = styled.button`
  background: none;
  border: none;
  margin-left: 20px;
  color: #4d85ee;
`;
