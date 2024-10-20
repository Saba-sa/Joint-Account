import {
  CREATE_ACCOUNT,
  SET_ACTIVE_ACCOUNT,
  ADD_DEPOSIT,
  ADD_WITHDRAW_REQUEST,
  APPROVE_WITHDRAW,
  WITHDRAW,
  SET_CONTRACT,
} from './actions';

export default function appReducer(state, action) {
  switch (action.type) {
    case 'SET_PROVIDER':
      return { ...state, provider: action.payload };
    case 'SET_SIGNER':
      return { ...state, signer: action.payload };
    case 'SET_ACCOUNT':
      return { ...state, account: action.payload };
    case CREATE_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };

    case SET_ACTIVE_ACCOUNT:
      return {
        ...state,
        activeAccount: action.payload,
      };

    case ADD_DEPOSIT:
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case ADD_WITHDRAW_REQUEST:
      return {
        ...state,
        pendingRequests: [...state.pendingRequests, action.payload],
      };

    case APPROVE_WITHDRAW:
      return {
        ...state,
        pendingRequests: state.pendingRequests.map(request =>
          request.id === action.payload
            ? { ...request, approvals: request.approvals + 1 }
            : request
        ),
      };

    case WITHDRAW:
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        pendingRequests: state.pendingRequests.filter(
          request => request.id !== action.payload.withdrawId
        ),
      };

    case SET_CONTRACT:
      return { ...state, contract: action.payload };

    default:
      return state;
  }
}
