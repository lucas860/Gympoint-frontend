export function listHelpOrdersRequest() {
  return {
    type: '@help/LIST_HELP_ORDERS_REQUEST',
  };
}

export function listHelpOrdersSuccess(list) {
  return {
    type: '@help/LIST_HELP_ORDERS_SUCCESS',
    payload: { list },
  };
}

export function openHelpOrder(helpOrderId, question) {
  return {
    type: '@help/OPEN_HELP_ORDER',
    payload: { helpOrderId, question },
  };
}

export function closeHelpOrder() {
  return {
    type: '@help/CLOSE_HELP_ORDER',
  };
}

export function answerHelpRequest(helpOrder, answer) {
  return {
    type: '@help/ANSWER_HELP_REQUEST',
    payload: { helpOrder, answer },
  };
}

export function answerHelpSuccess() {
  return {
    type: '@help/ANSWER_HELP_SUCCESS',
  };
}

export function helpFailure() {
  return {
    type: '@help/HELP_FAILURE',
  };
}
