import { createContext, useContext, useReducer, useEffect } from 'react';
import { ethers } from "ethers";
import appReducer from './appReducer';


const initialState = {
  accountId: 0,
  accounts: [],
  activeAccount: {},
  pendingRequests: [],
  balance: 0,
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
          const signer = await provider.getSigner(); // Change to directly get signer
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
      const contractAddress = '0x16EB2f0Cb3f23Ae18EEB388EfeE1EF8E2e817b0a'; // Your updated contract address
      const contractABI = [
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": false,
              "internalType": "address[]",
              "name": "owners",
              "type": "address[]"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestmap",
              "type": "uint256"
            }
          ],
          "name": "AccountCreated",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "value",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "Deposit",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "withdrawId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "Withdraw",
          "type": "event"
        },
        {
          "anonymous": false,
          "inputs": [
            {
              "indexed": true,
              "internalType": "address",
              "name": "user",
              "type": "address"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            },
            {
              "indexed": true,
              "internalType": "uint256",
              "name": "withdrawId",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "ammount",
              "type": "uint256"
            },
            {
              "indexed": false,
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "name": "WithdrawRequested",
          "type": "event"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            }
          ],
          "name": "deposit",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function",
          "payable": true
        },
        {
          "inputs": [
            {
              "internalType": "address[]",
              "name": "otherOwners",
              "type": "address[]"
            }
          ],
          "name": "createAccount",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "amount",
              "type": "uint256"
            }
          ],
          "name": "requestWithdrawal",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [],
          "name": "demotest",
          "outputs": [
            {
              "internalType": "string",
              "name": "",
              "type": "string"
            }
          ],
          "stateMutability": "pure",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "withdrawId",
              "type": "uint256"
            }
          ],
          "name": "approveWithdrawl",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "withdrawId",
              "type": "uint256"
            }
          ],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            }
          ],
          "name": "getBalance",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            }
          ],
          "name": "getOwners",
          "outputs": [
            {
              "internalType": "address[]",
              "name": "",
              "type": "address[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [
            {
              "internalType": "uint256",
              "name": "accountId",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "withdrawId",
              "type": "uint256"
            }
          ],
          "name": "getApprovals",
          "outputs": [
            {
              "internalType": "uint256",
              "name": "",
              "type": "uint256"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        },
        {
          "inputs": [],
          "name": "getAccounts",
          "outputs": [
            {
              "internalType": "uint256[]",
              "name": "",
              "type": "uint256[]"
            }
          ],
          "stateMutability": "view",
          "type": "function",
          "constant": true
        }
      ];

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



  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );

};

export { AppContext, AppProvider };