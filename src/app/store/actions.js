export const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
export const LOAD_ACCOUNT = 'LOAD_ACCOUNT';
export const SET_ACTIVE_ACCOUNT = 'SET_ACTIVE_ACCOUNT';
export const ACCOUNT_HISTORY = 'ACCOUNT_HISTORY';
export const ADD_WITHDRAW_REQUEST = 'ADD_WITHDRAW_REQUEST';
export const APPROVE_WITHDRAW = 'APPROVE_WITHDRAW';
export const WITHDRAW = 'WITHDRAW';
export const SET_PROVIDER = 'SET_PROVIDER';
export const SET_SIGNER = 'SET_SIGNER';
export const SET_ACCOUNT = 'SET_ACCOUNT';
export const SET_CONTRACT = 'SET_CONTRACT';

export const createAccount = (account) => ({
  type: CREATE_ACCOUNT,
  payload: account,
});
export const loadAccount = (account) => ({
  type: LOAD_ACCOUNT,
  payload: account,
});

export const setActiveAccount = (activeAccount) => ({
  type: SET_ACTIVE_ACCOUNT,
  payload: activeAccount,
});

export const accountHistory = (amount) => ({
  type: ACCOUNT_HISTORY,
  payload: amount,
});

export const addWithdrawRequest = (request) => ({
  type: ADD_WITHDRAW_REQUEST,
  payload: request,
});

export const approveWithdraw = (requestId) => ({
  type: APPROVE_WITHDRAW,
  payload: requestId,
});

export const withdraw = (withdrawId, amount) => ({
  type: WITHDRAW,
  payload: { withdrawId, amount },
});

export const setProvider = (provider) => ({
  type: SET_PROVIDER,
  payload: provider,
});

export const setSigner = (signer) => ({
  type: SET_SIGNER,
  payload: signer,
});

export const setAccount = (account) => ({
  type: SET_ACCOUNT,
  payload: account,
});

export const setContract = (contract) => ({
  type: SET_CONTRACT,
  payload: contract,
});
