import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  openHelpOrder,
  closeHelpOrder,
  listHelpOrdersRequest,
} from '~/store/modules/help/action';

import AnswerModal from './AnswerModal';

import { HelpContainer, Header, HelpList, AnswerButton } from './styles';

export default function HelpOrders() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.help.openned);
  const helpOrders = useSelector(state => state.help.helpList);

  useEffect(() => {
    async function loadHelpOrders() {
      dispatch(listHelpOrdersRequest());
    }

    loadHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
              </td>
            </tr>
          ))}
        </tbody>
      </HelpList>
      <AnswerModal open={open} onClose={handleClose} />
    </HelpContainer>
  );
}
