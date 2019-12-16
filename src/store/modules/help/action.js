export function listHelpOrders() {
  return {
    type: '@help/LIST_HELP_ORDERS',
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

export function answerRequest(answer) {
  return {
    type: '@help/ANSWER_HELP_REQUEST',
    payload: { answer },
  };
}

export function answerSuccess() {
  return {
    type: '@help/ANSWER_HELP_SUCCESS',
  };
}
