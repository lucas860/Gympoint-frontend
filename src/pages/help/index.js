import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '~/services/api';
import history from '~/services/history';

import { openHelpOrder, closeHelpOrder } from '~/store/modules/help/action';

import AnswerModal from './AnswerModal';

import { HelpContainer, Header, HelpList, AnswerButton } from './styles';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.help.openned);
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('/help-orders');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  function handleOpen({ id, question }) {
    dispatch(openHelpOrder(id, question));
  }

  function handleClose() {
    dispatch(closeHelpOrder());
  }

  return (
    <HelpContainer>
      <Header>
        <h1>Pedidos de auxílio</h1>
      </Header>

      <HelpList>
        <thead>
          <tr>
            <th>ALUNO</th>
          </tr>
        </thead>

        <tbody>
          {helpOrders.map(hp => (
            <tr key={hp.id}>
              <td>{hp.student.name}</td>
              <td>
                <AnswerButton onClick={() => handleOpen(hp)}>
                  responder
                </AnswerButton>
                <AnswerModal
                  helpId={hp.id}
                  question={hp.question}
                  open={open}
                  onClose={handleClose}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </HelpList>
    </HelpContainer>
  );
}
