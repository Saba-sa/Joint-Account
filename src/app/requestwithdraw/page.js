"use client";
import Historypendingrequest from "../components/Historypendingrequest";
import { useContext, useState } from "react";
import { AppContext } from "../store/AppContext";
import { parseUnits } from "ethers";
import { accountHistory, addWithdrawRequest } from "../store/actions"

const RequestWithdrawal = () => {
  const { state, dispatch } = useContext(AppContext);
  const [amount, setAmount] = useState("");

  const requestWithdraw = async (e) => {
    e.preventDefault();
    try {
      state.contract.once('WithdrawRequested', (user, accountId, withdrawId, ammount, timestamp) => {
        const temp = {
          accountId: accountId,
          withdrawId: withdrawId,
        };
        dispatch(addWithdrawRequest(temp));
        const history = [
          ...state.accountHistory,
          `${user.slice(0, 5)}...${user.slice(-3)} requested for ${ammount} wei`
        ];
        dispatch(accountHistory(history));
        ;
      });

      const result = await state.contract.requestWithdrawal(state.activeAccount.id, parseUnits(amount, "wei"));
      await result.wait();

      setAmount("");
    }
    catch (error) {
      console.error("Error requesting withdrawal:", error);
    }
  };


  return (
    <div className="bg-blue-100 h-[100vh] p-8">
      <div className="flex flex-wrap ml-9 my-5 ">
        <div className="w-full max-w-full sm:w-1/4 mx-auto text-center ">
          <h1 className="text-2xl font-semibold mb-4">Request Withdraw</h1>

          <form onSubmit={requestWithdraw}>
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="amount" className="block text-gray-600">Amount (in wei)</label>
              <div className="absolute right-0 mt-2 mx-2"></div>
              <input
                type="text"
                id="amount"
                name="amount"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="10000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <p className="text-red-600 my-2">Error: Contract doesn't have this much money</p>
            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
            >
              Request
            </button>
          </form>
        </div>
      </div>
      <Historypendingrequest />
    </div>
  );
}

export default RequestWithdrawal;
