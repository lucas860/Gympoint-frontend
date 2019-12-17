import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
  listHelpOrdersSuccess,
  answerHelpSuccess,
  helpFailure,
} from './action';

export function handleOpenHelpOrder() {
  history.push('/help/answer');
}

export function handleCloseHelpOrder() {
  history.push('/help');
}

export function* ListHelpOrders() {
  try {
    const { data } = yield call(api.get, '/help-orders');

    yield put(listHelpOrdersSuccess(data));
  } catch (err) {
    toast.error('Oops! Ocorreu uma falha ao listar os pedidos.');
    yield put(helpFailure());
  }
}

export function* answerHelpOrder({ payload }) {
  try {
    const { helpOrder, answer } = payload;

    yield call(api.post, `/help-orders/${helpOrder}`, {
      answer,
    });

    yield put(answerHelpSuccess());

    toast.success('Requisição de ajuda respodida com sucesso!');

    history.push('/help');
  } catch (err) {
    toast.error('Falha ao responder essa issue');
    yield put(helpFailure());
  }
}

export default all([
  takeLatest('@help/OPEN_HELP_ORDER', handleOpenHelpOrder),
  takeLatest('@help/CLOSE_HELP_ORDER', handleCloseHelpOrder),
  takeLatest('@help/LIST_HELP_ORDERS_REQUEST', ListHelpOrders),
  takeLatest('@help/ANSWER_HELP_REQUEST', answerHelpOrder),
]);
