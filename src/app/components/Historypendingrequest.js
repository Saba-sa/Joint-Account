import Pendingtranhistory from "./Pendingtranhistory"
import { AppContext } from "../store/AppContext";
import { useContext, useEffect, useState } from "react";
import Requests from "./requests";
const Historypendingrequest = () => {
  const { state } = useContext(AppContext);
  const [requests, setRequest] = useState([])
  const [approvedRequets, setApprovedRequets] = useState([])


  useEffect(() => {
    const getAccountDetail = async () => {
      const temp = state.pendingRequests.filter(
        (i) => Number(i.accountId) === Number(state.activeAccount.id)
      );
      const requestDetails = [];

      for (let i = 0; i < temp.length; i++) {
        try {
          const details = await state?.contract?.seeWithDrawRequest(temp[i].accountId, temp[i].withdrawId);
          const t = {
            accountId: temp[i].accountId,
            withdrawId: temp[i].withdrawId,
            user: details[0],
            amount: details[1],
            approvals: details[2],
            status: details[3],
            approvingOwners: [...details[4]],
          }
          requestDetails.push(t);
        } catch (error) {
          console.error("Error fetching withdrawal request details:", error);
        }
      }
      console.log('requests', requestDetails)
      const t = requestDetails?.filter((detail) => detail.approvingOwners.length >= 3);
      const s = requestDetails?.filter((i) => Number(i.withdrawId) !== Number(t.withdrawId));
      console.log('s', s)
      console.log('t', t)
      const pending = s.filter((detail) => detail.approvingOwners.length < 3)
      console.log('pending', pending)
      setApprovedRequets(t)
      setRequest(pending)
    };

    if (state.pendingRequests && state.pendingRequests.length > 0) {
      getAccountDetail();
    }
  }, [state.pendingRequests])
  return (
    requests.length > 0 && (
      <div className="max-w-sm mx-auto my-10">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
          <Requests Heading='Pending unapproved transactions' Requests={requests} />
          {approvedRequets.length > 0 && <Requests Heading='Approved transactions' Requests={approvedRequets} approved={true} />}

        </div>
      </div>
    )
  )
}
export default Historypendingrequest;