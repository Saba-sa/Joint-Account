export default function accountReducer(state, action) {
  switch (action.type) {
    case 'CREATE_ACCOUNT':
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };
      
    case 'SET_ACTIVE_ACCOUNT':
      return {
        ...state,
        activeAccount: action.payload,
      };

    case 'ADD_DEPOSIT':
      return {
        ...state,
        balance: state.balance + action.payload,
      };

    case 'ADD_WITHDRAW_REQUEST':
      return {
        ...state,
        pendingRequests: [...state.pendingRequests, action.payload],
      };

    case 'APPROVE_WITHDRAW':
      return {
        ...state,
        pendingRequests: state.pendingRequests.map(request =>
          request.id === action.payload.id
            ? { ...request, approvals: request.approvals + 1 }
            : request
        ),
      };

    case 'WITHDRAW':
      return {
        ...state,
        balance: state.balance - action.payload.amount,
        pendingRequests: state.pendingRequests.filter(
          request => request.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
}
