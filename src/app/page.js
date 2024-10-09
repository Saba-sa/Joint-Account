"use client";
import { useEffect, useState } from "react";
import { useContract } from "./store/AppContext";
import { useRouter } from "next/navigation";
import { ethers } from 'ethers';

// import { createAccount, addDeposit } from './store/actions';
//   const { state, dispatch } = useContract();
//   const handleCreateAccount = () => {
//     const newAccount = {/* Account data */ };
//     dispatch(createAccount(newAccount));
//   };

//   const handleDeposit = (amount) => {
//     dispatch(addDeposit(amount));
//   };


const CreateAccount = () => {
  const { state, dispatch } = useContract();
  const [accountAddr, setaccountAddr] = useState([
    {
      add1: "",
      holdsAccount: 0,
    },
    {
      add2: "",
      holdsAccount: 0,
    },
    {
      add3: "",
      holdsAccount: 0,
    },
  ]);
  const route = useRouter();

  // useEffect(() => {
  //   const t = async () => {
  //     const [deployer] = await ethers.getSigners(); // Get the deployer account
  //     console.log("Deploying contracts with the account:", deployer.address); // Log deployer address

  //     const BankAccount = await ethers.getContractFactory("BankAccount");
  //     const bankAccount = await BankAccount.deploy();
  //     await bankAccount.deployed();

  //     console.log("BankAccount deployed to:", bankAccount.address);
  //   }
  //   t()
  // }, []);
  async function connectToContract() {
     const provider = new ethers.JsonRpcProvider("http://127.0.0.1:7545");
        console.log('Provider created:', provider);
    const signer =await provider.getSigner();
    console.log('signer', signer)
const contractAddress = '0x461351Bb638d5868Fb22f8182C82F913B61ea64A';
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
    "type": "function"
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
    "name": "getOwners",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
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
    "name": "getApprovals",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
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
    "type": "function"
  }
]
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    console.log('contract', contract)

    try {
      const value = await contract.getAccounts(); 
      console.log("nextAccountId from contract:", value);
    } catch (error) {
      console.error("Error calling contract function:", error);
    }

    // Example: Send a transaction to the contract
    // try {
    //   const tx = await contract.someFunctionToSendTransaction({ value: ethers.utils.parseEther("0.1") }); // Replace with your function
    //   await tx.wait(); // Wait for the transaction to be confirmed
    //   console.log("Transaction confirmed");
    // } catch (error) {
    //   console.error("Error sending transaction:", error);
    // }
  }

  // Call the function to connect and interact with the contract
  connectToContract();

  const AddOwners = async (e) => {
    e.preventDefault();
    if (
      accountAddr[0].add1.length > 20 &&
      accountAddr[1].add2.length > 20 &&
      accountAddr[2].add3.length > 20
    ) {
      if (state.contract) {
        try {
          const result = await state.contract.createAccount([
            accountAddr[0].add1,
            accountAddr[1].add2,
            accountAddr[2].add3,
          ]);
          console.log("result", result);
          // Handle result
          dispatch({ type: 'CREATE_ACCOUNT', payload: result });
          route.push('/deposit')
        } catch (error) {
          console.error("Error fetching data from contract", error);
        }
      }
    } else {
      alert("Please fill all fields");
    }
  };

  const checkOwners = async () => {
    const accounts = await state.contract.getAccounts(); // Adjusted method to match contract

    accounts.forEach((account) => {
      account.owners.forEach((owner) => {
        if (owner === accountAddr[0].add1) {
          setaccountAddr((prev) => [
            { ...prev[0], holdsAccount: prev[0].holdsAccount + 1 },
            prev[1],
            prev[2],
          ]);
        } else if (owner === accountAddr[1].add2) {
          setaccountAddr((prev) => [
            prev[0],
            { ...prev[1], holdsAccount: prev[1].holdsAccount + 1 },
            prev[2],
          ]);
        } else if (owner === accountAddr[2].add3) {
          setaccountAddr((prev) => [
            prev[0],
            prev[1],
            { ...prev[2], holdsAccount: prev[2].holdsAccount + 1 },
          ]);
        }
      });
    });
  };

  return (
    <>
      <div className="bg-sky-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img
            src="https://img.freepik.com/fotos-premium/imagen-fondo_910766-187.jpg?w=826"
            alt="Placeholder Image"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4">Creating Account</h1>
          <p className="pb-4 text-gray-600">Add account addresses that will be part of this joint account but remeber don't put your address beacuse when you create the account you automatically become owner of that account.</p>
          <form action="#">
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="owner1" className="block text-gray-600">Owner 01</label>
              {accountAddr[0].holdsAccount < 4 && <div className="absolute right-0 mt-2 mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>}
              <input
                type="text"
                id="owner1"
                name="owner1"
                className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10  focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="0x................................................................"
                value={accountAddr[0].add1}
                onChange={(e) =>
                  setaccountAddr([
                    { ...accountAddr[0], add1: e.target.value }, accountAddr[1], accountAddr[2],
                  ])
                } />
            </div>
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="owner2" className="block text-gray-600">Owner 02</label>
              {accountAddr[1].holdsAccount < 4 && <div className="absolute right-0 mt-2 mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>}
              <input
                type="text"
                id="owner2"
                name="owner2"
                className="w-full border border-gray-300 rounded-md py-2 px-3  pr-10 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="0x................................................................"
                value={accountAddr[1].add2}
                onChange={e => setaccountAddr([{ ...accountAddr[1], add2: e.target.value }, accountAddr[0], accountAddr[2]])}
              />
            </div>
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="owner3" className="block text-gray-600">Owner 03</label>
              {accountAddr[2].holdsAccount < 4 && <div className="absolute right-0 mt-2 mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>}
              <input
                type="text"
                id="owner3"
                name="owner3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="0x................................................................"
                value={accountAddr[0].add3}
                onChange={e => setaccountAddr([{ ...accountAddr[2], add3: e.target.value }, accountAddr[1], accountAddr[0]])}

              />
            </div>
            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              onClick={(e) => AddOwners(e)}>
              Create Account
            </button>
          </form>

        </div>
      </div>

    </>
  )
};

export default CreateAccount;
