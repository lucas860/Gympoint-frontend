import produce from 'immer';

const INITIAL_STATE = {
  openned: false,
  helpOrders: null,
  helpOrder: null,
  question: null,
};

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/LIST_HELP_ORDERS': {
        break;
      }
      case '@help/OPEN_HELP_ORDER': {
        draft.openned = true;
        draft.helpOrder = action.payload.helpOrderId;
        draft.question = action.payload.question;
        break;
      }
      case '@help/CLOSE_HELP_ORDER': {
        draft.openned = false;
        draft.helpOrder = null;
        draft.question = null;
        break;
      }
      case '@help/ANSWER_HELP_REQUEST': {
        break;
      }
      case '@help/ANSWER_HELP_SUCCESS': {
        break;
      }
      default:
    }
  });
}
