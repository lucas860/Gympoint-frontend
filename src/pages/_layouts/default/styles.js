import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

export const Wrapper = styled.div`
  min-height: 100%;
  overflow: hidden;
  background: #f5f5f5;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
`;

export const ContainerBox = styled.div`
  width: 900px;
`;

export const Card = styled(Form)`
  display: flex;
  flex-direction: column;

  background: #fff;
  padding: 30px;
  border-radius: 4px;

  strong {
    display: block;
    color: #444;

    &:first-child {
      margin-top: 0;
    }
  }
`;

export const CardInput = styled(Input)`
  width: 100%;
  height: 45px;
  padding: 0 15px;
  border: 1px solid #dddddd;
  border-radius: 4px;
  font-size: 16px;
  color: #666;

  margin-top: 10px;
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }

  &:read-only {
    background: #f5f5f5;
    cursor: not-allowed;
  }
`;

export const Line = styled.div`
  display: flex;
  justify-content: space-between;

  > div {
    width: 100%;
    margin-right: 20px;

    &:last-child {
      margin: 0;
    }
  }
`;

export const BackButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 112px;
  height: 36px;
  background: #ccc;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: bold;
`;

export const SaveButton = styled.button`
  width: 112px;
  height: 36px;
  background: #ee4d64;
  border: none;
  border-radius: 4px;
  margin-left: 15px;
  color: #fff;
  font-weight: bold;
`;

export const EditButton = styled.button`
  background: none;
  border: none;
  margin-left: 20px;
  color: #4d85ee;
`;

export const DelButton = styled.button`
  background: none;
  border: none;
  margin-left: 20px;
  color: #de3b3b;
`;
