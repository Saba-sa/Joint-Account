import { createContext, useReducer, useEffect } from 'react';
import { ethers } from "ethers";
import appReducer from './appReducer';
import Abi from "../abi/Bank.json"

const initialState = {
  accountId: 0,
  accounts: [],
  activeAccount: {},
  pendingRequests: [],
  accountHistory: [],
  provider: null,
  signer: null,
  contract: null,
};

const AppContext = createContext();
const AppProvider = ({ children }) => {

  const [state, dispatch] = useReducer(appReducer, initialState);


  useEffect(() => {
    const providerSet = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
          // const signer = await provider.getSigner(); 
          const signer = new ethers.Wallet("0x18849b5ebed672d5af3eb2b457323a7ba877b1f11d5a21bae201a15e8ba6ba45", provider)
          console.log('signer', signer)
          const account = await signer.getAddress();
          dispatch({ type: 'SET_PROVIDER', payload: provider });
          dispatch({ type: 'SET_SIGNER', payload: signer });
          dispatch({ type: 'SET_ACCOUNT', payload: account });

          await initContract(signer);
        } else {
          console.error("Ethereum provider not found.");
        }
      } catch (error) {
        console.error('Error initializing provider and signer', error);
      }
    };

    providerSet();
  }, []);

  const initContract = async (signer) => {
    try {
      const contractAddress = '0xFE555E00966bD26E6BA65C4C206aDd0454123ccd';
      const contractABI = Abi;
      if (signer && contractAddress && contractABI) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        console.log('contract', contract);
        dispatch({ type: 'SET_CONTRACT', payload: contract });
      } else {
        console.error('Signer, contract address, or ABI is missing.');
      }
    } catch (error) {
      console.error('Error initializing contract', error);
    }
  };



  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );

};

export { AppContext, AppProvider };