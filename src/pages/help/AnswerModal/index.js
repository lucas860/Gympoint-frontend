import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { answerHelpRequest } from '~/store/modules/help/action';

import { ModalContainer, Answer, AnswerForm } from './styles';

export default function AnswerModal(props) {
  const dispatch = useDispatch();
  const question = useSelector(state => state.help.question);
  const helpId = useSelector(state => state.help.helpOrder);

  const [answer, setAnswer] = useState('');

  function handleSubmit() {
    dispatch(answerHelpRequest(helpId, answer));
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
          <textarea name="answer" onChange={e => setAnswer(e.target.value)} />

          <button type="submit">Responder aluno</button>
        </AnswerForm>
      </Answer>
    </ModalContainer>
  );
}
