import produce from 'immer';

const INITIAL_STATE = {
  openned: false,
  helpList: [],
  helpOrder: null,
  question: null,
  answer: null,
};

export default function help(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@help/LIST_HELP_ORDERS_REQUEST': {
        break;
      }
      case '@help/LIST_HELP_ORDERS_SUCCESS': {
        draft.helpList = action.payload.list;
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
        draft.openned = false;
        draft.helpList = draft.helpList.filter(h => h.id !== draft.helpOrder);
        draft.helpOrder = null;
        draft.question = null;
        draft.answer = null;
        break;
      }
      case '@help/HELP_FAILURE': {
        break;
      }
      default:
    }
  });
}
