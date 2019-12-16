import styled from 'styled-components';
import Modal from '@material-ui/core/Modal';
import { Form } from '@rocketseat/unform';

export const ModalContainer = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Answer = styled.div`
  background: #fff;
  width: 100%;
  height: 100%;
  max-width: 450px;
  max-height: 425px;
  border-radius: 4px;
  padding: 30px;

  div {
    height: 150px;

    p {
      margin-top: 10px;
      margin-bottom: 20px;
      font-size: 16px;
    }
  }
`;

export const AnswerForm = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 215px;

  textarea {
    resize: none;
    width: 100%;
    height: 120px;
    margin-top: 10px;
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  button {
    width: 100%;
    height: 45px;
    background: #ee4d64;
    border: none;
    border-radius: 4px;
    font-weight: bold;
    color: #fff;
  }
`;
