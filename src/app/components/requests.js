import Pendingtranhistory from "./Pendingtranhistory"

const Requests = ({ Heading = '', Requests = [] }) => {

  return (
    <>
      <h1 className="text-xl ">{Heading}</h1>
      <ul className="divide-y divide-gray-200 pt-4">
        {
          Requests.map((request) => {
            return (
              <Pendingtranhistory key={request.withdrawId} request={request} />
            )
          })
        }


      </ul>
    </>

  )
}
export default Requests;