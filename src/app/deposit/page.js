"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../store/AppContext";
import { ethers, parseUnits } from "ethers";
import { accountHistory, loadAccount } from "../store/actions";

const Deposit = () => {
  const { state, dispatch } = useContext(AppContext);
  const [depositDetail, setDepositDetail] = useState({
    address: '0xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    value: "value must be in wei"
  });


  const depositFunds = async () => {
    if (state.contract) {
      try {
        const signer = new ethers.Wallet(depositDetail.address, state.provider);

        // Reconnect the contract instance with the new signer
        const contractWithSigner = state.contract.connect(signer);

        console.log('Attempting deposit with address:', await signer.getAddress());


        const result = await contractWithSigner.deposit(state.activeAccount.id, {
        // const result = await state.contract.deposit(state.activeAccount.id, {
          value: parseUnits(depositDetail.value, "wei"),
        });
        console.log('Deposited result', result);
        const t = await result.wait();
        console.log(t, "FInal Result")

        if (t) {
          const balanceAmt = await contractWithSigner.getBalance(state.activeAccount.id);
          // const balanceAmt = await state.contract.getBalance(state.activeAccount.id);
          const updatedActiveAccount = {
            ...state.activeAccount,
            balance: balanceAmt,
          };
          dispatch(loadAccount(updatedActiveAccount));
          const history = [
            ...state.accountHistory,
            `${depositDetail.address.slice(0, 5)}...${depositDetail.address.slice(-3)} deposited ${depositDetail.value} wei`,
          ];
          dispatch(accountHistory(history));
          setDepositDetail({
            address: '',
            value: '',
          });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }


  return (
    <div className="bg-blue-100 h-[100vh] p-8">
      <div className="flex flex-wrap ml-9 my-5 ">
        <div className="w-full max-w-full sm:w-1/4 mx-auto text-center ">
          <h1 className="text-2xl font-semibold mb-4">Deposit</h1>

          <form action="#">
            {/* Owner Address */}
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="owner2" className="block text-gray-600">Owner</label>
              <div className="absolute right-0 mt-2 mx-2">
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
              </div>
              <input
                type="text"
                id="owner2"
                name="owner2"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="0x................................................................"
                value={depositDetail.address}
                onChange={(e) => setDepositDetail({ ...depositDetail, address: e.target.value })}
              />
            </div>

            {/* Deposit Value */}
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="owner3" className="block text-gray-600">Value (Wei)</label>
              <div className="absolute right-0 mt-2 mx-2">
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
              </div>
              <input
                type="text"
                id="owner3"
                name="owner3"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="0x................................................................"
                value={depositDetail.value}
                onChange={(e) => setDepositDetail({ ...depositDetail, value: e.target.value })}
              />
            </div>

            {/* Error Display */}
            <p className="text-red-600 my-2">Error: You don't have enough funds</p>

            {/* Deposit Button */}
            <button
              type="button"
              onClick={depositFunds}
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Deposit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Deposit;
