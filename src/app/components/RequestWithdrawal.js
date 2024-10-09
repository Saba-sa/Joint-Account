import Historypendingrequest from "./Historypendingrequest";
const RequestWithdrawal=()=>{
return (
     <div className="bg-blue-100 h-[100vh] p-8">
      <div className="flex flex-wrap ml-9 my-5 ">
        <div className="w-full max-w-full sm:w-1/4 mx-auto text-center ">
    <h1 className="text-2xl font-semibold mb-4">Request Withdraw</h1>
   
    <form action="#">
 
      <div className="mb-4 bg-sky-100 relative">
        <label htmlFor="owner2" className="block text-gray-600">Amount(in wei)</label>
             <div className="absolute right-0 mt-2 mx-2">
  </div>
       <input
          type="text"
          id="owner2"
          name="owner2"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
          placeholder="10000"
        />
      </div>
      
      <p className="text-red-600 my-2">Error contract doen't have this much money</p>
      <button
        type="submit"
        className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Request
      </button>
    </form>
    
  </div>
</div>
<Historypendingrequest/>
</div>
)
}
export default RequestWithdrawal;