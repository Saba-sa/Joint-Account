import Pendingtranhistory from "./Pendingtranhistory"
const Historypendingrequest=()=>{
  return (
    <div className="max-w-sm mx-auto my-10">
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-8">
    <h1 className="text-xl ">Pending unapproved transactions</h1>
      <ul className="divide-y divide-gray-200 pt-4">
       <Pendingtranhistory/>
       <Pendingtranhistory/>
       <Pendingtranhistory/>
       
      </ul>
    </div>
  </div>

  )
}
export default Historypendingrequest;