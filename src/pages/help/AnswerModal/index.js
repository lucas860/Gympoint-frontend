import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  handleAnswerText,
  answerHelpRequest,
} from '~/store/modules/help/action';

import { ModalContainer, Answer, AnswerForm } from './styles';

export default function AnswerModal(props) {
  const dispatch = useDispatch();
  const question = useSelector(state => state.help.question);
  const helpId = useSelector(state => state.help.helpOrder);
  const answer = useSelector(state => state.help.answer);

  function handleSubmit() {
    dispatch(answerHelpRequest(helpId, answer));
  }

  function handleAnswer(text) {
    dispatch(handleAnswerText(text));
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
          <textarea
            name="answer"
            value={answer}
            onChange={e => handleAnswer(e.target.value)}
          />

          <button type="submit">Responder aluno</button>
        </AnswerForm>
      </Answer>
    </ModalContainer>
  );
}
