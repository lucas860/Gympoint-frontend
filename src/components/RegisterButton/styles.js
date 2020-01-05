import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Button = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;

  width: 142px;
  height: 36px;
  background: #ee4d64;
  border: 0;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
`;
