"use client";
import { accountHistory } from '@/app/store/actions';
import { AppContext } from '@/app/store/AppContext';
import { ethers } from 'ethers';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const ApprovedWithdraw = () => {
  console.log('heeeloooo');
  const { withdrawid } = useParams();
  const [requestDetails, setRequestDetails] = useState({
    withdrawRequesterAddr: '0x0000000000000',
    amount: 0,
    approvals: 0,
    approved: false,
    approvingOwners: [],
  });
  const [alreadyWithdrawn, setAlreadyWithdrawn] = useState(false);
  const { state } = useContext(AppContext);

  const fetchDetails = async () => {
    const temp = await state.contract.seeWithDrawRequest(Number(state.activeAccount.id), Number(withdrawid));

    setRequestDetails({
      withdrawRequesterAddr: temp[0],
      amount: Number(temp[1]),
      approvals: Number(temp[2]),
      approved: Boolean(temp[3]),
      approvingOwners: [...temp[4]],
    });
  };

  useEffect(() => {
    fetchDetails();
  }, [state.pendingRequests]);

  const setApproval = async () => {
    try {
      const withdrawIdNumber = Number(withdrawid);
      const activeAccountId = Number(state.activeAccount.id);

      if (isNaN(withdrawIdNumber) || isNaN(activeAccountId)) {
        throw new Error('Invalid parameters');
      }

      const signer = new ethers.Wallet("0x488d2a446128742d43709df261d71e4f4bd9fee5175b8f91c86fe0e9595e4317", state.provider);
      const contractWithSigner = state.contract.connect(signer);

      const temp = await contractWithSigner.withdraw(activeAccountId, withdrawIdNumber, {
        value: ethers.utils.parseEther(requestDetails.amount.toString()),
        gasLimit: 100000,
      });
      await temp.wait();

      setAlreadyWithdrawn(true); // Update state after withdrawal

      contractWithSigner.on("Withdraw", (withdrawId, blockTimestamp) => {
        console.log('hey', withdrawId, blockTimestamp);
      });

      fetchDetails(); // Fetch new details after withdrawal

      const history = [
        ...state.accountHistory,
        `${signer.address.slice(0, 5)}...${signer.address.slice(-3)} withdrew ${requestDetails.amount}`,
      ];
      dispatch(accountHistory(history));
    } catch (error) {
      let revertMessage = "Transaction failed without a clear revert reason.";

      if (error.data && error.data.reason) {
        revertMessage = error.data.reason;
      } else if (error.message && error.message.includes("revert")) {
        revertMessage = error.message.split("revert")[1]?.trim() || revertMessage;
      }

      console.error("Revert message:", revertMessage);
      // Optionally set an error state to display in the UI
    }
  };


  if (!withdrawid) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen">
        <div className="max-w-[720px] mx-auto">
          <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
            <h1 className='text-blue-700'>Withdraw request has been approved</h1>
            <span className="block w-full px-4 py-2 text-center text-slate-700 transition-all">
              Withdraw Requests id is: <b>{Number(withdrawid) + 1}</b>.
            </span>
          </div>

          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="p-6">
              <div className="flex gap-4 justify-between flex-col mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Address: {requestDetails.withdrawRequesterAddr}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Amount Requested: {requestDetails.amount}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Total Approvals: {requestDetails.approvals}
                </p>
              </div>
              {requestDetails.approvingOwners.length > 0 && (
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Accounts that have approved the request:
                </p>
              )}
              {requestDetails.approvingOwners.map((item, index) => (
                <p key={index} className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                  {item}
                </p>
              ))}
            </div>
            <div className="p-6 pt-0">
              {alreadyWithdrawn ? (
                <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100" type="button">
                  Already Withdrawn
                </button>
              ) : (
                <button className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100" type="button" onClick={setApproval}>
                  Withdraw
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovedWithdraw;