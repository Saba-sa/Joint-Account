import { createContext, useContext, useReducer,useEffect } from 'react';
// import {ethers} from "ethers";
import appReducer from './appReducer';

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const moonbeamRPC = process.env.NEXT_PUBLIC_MOONBEAM_RPC_URL;

const initialState = {
    accountId:0,
  accounts: [],
  activeAccount: null, 
  pendingRequests: [], 
  balance: 0, 
};
const switchToMoonbeam = async () => {
    try {
        await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
                {
                    chainId: '0x507', 
                    chainName: 'Moonbase Alpha',
                    nativeCurrency: {
                        name: 'DEV',
                        symbol: 'DEV',
                        decimals: 18,
                    },
                    rpcUrls: ['https://rpc.api.moonbase.moonbeam.network'],
                    blockExplorerUrls: ['https://moonbase.moonscan.io/'],
                },
            ],
        });
    } catch (error) {
        console.error("Failed to switch network", error);
    }
};

export const AppContext = createContext();
export const AppProvider = ({ children }) => {

 useEffect(() => {
    const initContract = async () => {
        try {
            if (typeof window !== 'undefined' && window.ethereum) {
                await switchToMoonbeam();

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                dispatch({ type: 'SET_PROVIDER', payload: provider });

                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const signer = provider.getSigner();
                dispatch({ type: 'SET_SIGNER', payload: signer });

                const account = await signer.getAddress();
                dispatch({ type: 'SET_ACCOUNT', payload: account });

                const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
                const contract = new ethers.Contract(contractAddress, abi, signer);
                dispatch({ type: 'SET_CONTRACT', payload: contract });
            }
        } catch (error) {
            console.error("Error initializing contract", error);
        }
    };

    initContract();
}, []);

  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
export const useContract = () => {
    return useContext(AppContext);
};