import React, { useState } from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { ModalContainer, Answer, AnswerForm } from './styles';

export default function AnswerModal({ helpId, question, ...props }) {
  const [answer, setAnswer] = useState('');

  async function handleSubmit() {
    // try {
    //   await api.post(`/help-orders/${helpId}/answer`, {
    //     answer,
    //   });

    //   history.push('/help');
    // } catch (err) {
    //   toast.error('Falha ao responder essa issue');
    // }

    console.tron.log(props);
  }

  return (
    <ModalContainer {...props}>
      <Answer>
        <div>
          <strong>PERGUNTA DO ALUNO</strong>
          <p>{question}</p>
        </div>

        <AnswerForm id="answer" onSubmit={handleSubmit}>
          <strong>SUA RESPOSTA</strong>
          <textarea value={answer} onChange={e => setAnswer(e.target.value)} />

          <button type="submit">Responder aluno</button>
        </AnswerForm>
      </Answer>
    </ModalContainer>
  );
}
