import CONSTANTS from "../constants/index";
const { ACTIONS } = CONSTANTS;

export function messageReducer(state, action) {
  switch (action.type) {
    case ACTIONS.MESSAGE_LOAD_SUCCESS: {
      const {
        payload: { comments },
      } = action;
      return {
        ...state,
        messages: comments,
        isLoading: false,
        error: null,
      };
    }
    case ACTIONS.MESSAGE_LOAD_ERROR: {
      const {
        payload: { error },
      } = action;
      return {
        ...state,
        error,
        isLoading: false,
      };
    }
    case ACTIONS.ADD_NEW_MESSAGE: {
      const { payload: newMessage } = action;
      const newMessagesArray = [...state.messages, newMessage];
      return {
        ...state,
        messages: newMessagesArray,
      };
    }
    default:
      return state;
  }
}
