import { createContext, useReducer, useEffect } from 'react';
import { ethers } from 'ethers';
import appReducer from './appReducer';
import Abi from "../abi/Bank.json";

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
console.log('context store')
  useEffect(() => {
    const providerSet = async () => {
      try {
        if (typeof window !== 'undefined' && window.ethereum) {
          try {
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: '0x507' }] // Moonbeam's chain ID in hex (1287 for Moonbase Alpha TestNet)
            });
          } catch (switchError) {
            // If Moonbeam is not available, we try adding it
            if (switchError.code === 4902) {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [
                  {
                    chainId: '0x507', // Moonbeam chain ID in hex
                    chainName: 'Moonbeam',
                    rpcUrls: ['https://rpc.api.moonbeam.network'],
                    nativeCurrency: {
                      name: 'GLMR',
                      symbol: 'GLMR', // Moonbeam’s native token symbol
                      decimals: 18,
                    },
                    blockExplorerUrls: ['https://moonscan.io'],
                  },
                ],
              });
            } else {
              console.error('Unable to switch to the Moonbeam network');
              return;
            }
          }

          accountsSetter();
        } else {
          console.error("Please install wallet first");
        }
      } catch (error) {
        console.error('Error initializing provider and signer', error);
      }
    };

    providerSet();
  }, []);
  useEffect(() => {
    if (window.ethereum) {
      // Listen for account changes
      window.ethereum.on('accountsChanged', accountsSetter);
    }
  }, [state.activeAccount, dispatch])
  const initContract = async (signer) => {
    try {
      const contractAddress = '0x2B5C83b40Da9bA48a45F47879D36c72ADF866940';
      const contractABI = Abi;

      // Ensure signer and contract info is available
      if (signer && contractAddress && contractABI) {
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        dispatch({ type: 'SET_CONTRACT', payload: contract });
      } else {
        console.error('Signer, contract address, or ABI is missing.');
      }
    } catch (error) {
      console.error('Error initializing contract', error);
    }
  };
  const accountsSetter = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const account = signer.address;
    console.log('accounts', account)
    dispatch({ type: 'SET_PROVIDER', payload: provider });
    dispatch({ type: 'SET_SIGNER', payload: signer });
    dispatch({ type: 'SET_ACCOUNT', payload: account });

    await initContract(signer);
  }
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
