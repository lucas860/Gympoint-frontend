import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';
import history from '~/services/history';

export function handleOpenHelpOrder() {
  history.push('/help/answer');
}

export function handleCloseHelpOrder() {
  history.push('/help');
}

export function* answerHelpOrder() {
  // try {
  //   await api.post(`/help-orders/${helpId}`, {
  //     answer,
  //   });
  //   history.push('/help');
  // } catch (err) {
  //   toast.error('Falha ao responder essa issue');
  // }
}

export default all([
  takeLatest('@help/OPEN_HELP_ORDER', handleOpenHelpOrder),
  takeLatest('@help/CLOSE_HELP_ORDER', handleCloseHelpOrder),
  takeLatest('@help/ANSWER_HELP_REQUEST', answerHelpOrder),
]);
