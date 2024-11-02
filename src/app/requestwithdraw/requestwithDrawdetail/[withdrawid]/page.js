"use client";
import { accountHistory } from '@/app/store/actions';
import { AppContext } from '@/app/store/AppContext';
import { ethers } from 'ethers';
import { useParams } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const RequestDetail = () => {
  const { withdrawid } = useParams(); // Access the dynamic route parameter here
  const [requestDetails, setRequestDetails] = useState({
    withdrawRequesterAddr: '0x0000000000000',
    amount: 0,
    approvals: 0,
    approved: false,
    approvingOwners: [],
  });
  const [isApproved, setIsApproved] = useState(false);
  const { state } = useContext(AppContext);


  const fetchDetails = async () => {

    const temp = await state?.contract?.seeWithDrawRequest(Number(state.activeAccount.id), Number(withdrawid));
    console.log('see with draw detail', temp)
    console.log('see with draw detail', temp[0])
    setRequestDetails({
      withdrawRequesterAddr: temp[0],
      amount: Number(temp[1]),
      approvals: Number(temp[2]),
      approved: Boolean(temp[3]),
      approvingOwners: [...temp[4]],
    })
    console.log('set detail')
    if (Boolean(temp[3])) {
      setIsApproved(true)
      console.log('if approevv')
    }

  }
  useEffect(() => {
    fetchDetails();
  }, [state.pendingRequests])

  const setApproval = async () => {
    try {

      const withdrawIdNumber = Number(withdrawid);
      const activeAccountId = Number(state.activeAccount.id);

      if (isNaN(withdrawIdNumber) || isNaN(activeAccountId)) {
        throw new Error('Invalid parameters');
      }


      const temp = await state?.contract?.approveWithdrawl(activeAccountId, withdrawIdNumber);
      await temp.wait();
      console.log('temp', temp)
      if (temp) {
        fetchDetails();
        console.log('in fetching details')
        const history = [
          ...state.accountHistory,
          `${signer.address.slice(0, 5)}...${signer.address.slice(-3)} approved the withdraw request ${withdrawIdNumber}`,
        ];
        dispatch(accountHistory(history));
        console.log('in history added')
      }
    } catch (error) {
      // let revertMessage = "Transaction failed without a clear revert reason.";

      // if (error.data?.reason) {
      //   revertMessage = error.data.reason;
      // } else if (error.data?.message) {
      //   revertMessage = error.data.message;
      // } else if (error.message && error.message.includes("revert")) {
      //   revertMessage = error.message.split("revert")[1]?.trim();
      // }

      console.error("Revert message:", error);
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
            <a
              target="_blank"
              href="https://www.material-tailwind.com/docs/html/card"
              className="block w-full px-4 py-2 text-center text-slate-700 transition-all"
            >
              Withdraw Requests id is:<b>{Number(withdrawid) + 1}</b>.
            </a>
          </div>

          <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
            <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
              <img
                src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
                alt="card-image" className="object-cover w-full h-full" />
            </div>
            <div className="p-6">
              <div className="flex gap-4 justify-between flex-col mb-2">
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Address: {requestDetails.withdrawRequesterAddr}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Amount Requested:{requestDetails.amount}
                </p>
                <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                  Total Approvals:{requestDetails.approvals}
                </p>
              </div>
              {requestDetails.approvingOwners.length > 0 && <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
                Account's that have approved the request are:                </p>}

              {requestDetails?.approvingOwners?.map((item, i) => {
                return <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75" key={i}>
                  {item}
                </p>

              })}
            </div>
            <div className="p-6 pt-0">
              {isApproved ?
                <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button" >
                  Already Approved
                </button>
                : <button
                  className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                  type="button" onClick={setApproval}>
                  Approve
                </button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
