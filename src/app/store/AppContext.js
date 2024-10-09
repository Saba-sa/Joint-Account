import { createContext, useContext, useReducer, useEffect } from 'react';
import { ethers } from "ethers";
import appReducer from './appReducer';
import {
  setProvider, setSigner, setAccount, setContract
} from './actions';

const initialState = {
  accountId: 0,
  accounts: [],
  activeAccount: null,
  pendingRequests: [],
  balance: 0,
  provider: null,
  signer: null,
  contract: null,
};

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const initContract = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          // Request network change (Moonbeam)
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{ /*...*/ }],
          });

          const provider = new ethers.providers.Web3Provider(window.ethereum);
          dispatch(setProvider(provider));

          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const signer = provider.getSigner();
          dispatch(setSigner(signer));

          const account = await signer.getAddress();
          dispatch(setAccount(account));

          const contract = new ethers.Contract(
            process.env.NEXT_PUBLIC_CONTRACT_ADDRESS, 
            abi, 
            signer
          );
          dispatch(setContract(contract));
        }
      } catch (error) {
        console.error('Error initializing contract', error);
      }
    };

    initContract();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useContract = () => {
  return useContext(AppContext);
};
