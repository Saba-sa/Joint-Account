const Deposit=()=>{
  return (
    <div className="bg-blue-100 h-[100vh] p-8">
      <div className="flex flex-wrap ml-9 my-5 ">
        <div className="w-full max-w-full sm:w-1/4 mx-auto text-center ">
    <h1 className="text-2xl font-semibold mb-4">Deposit</h1>
   
    <form action="#">
 
      {/* auto select */}
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
        />
      </div>
      <div className="mb-4 bg-sky-100 relative">
        <label htmlFor="owner3" className="block text-gray-600">Value</label>
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
        />
      </div>
      <p className="text-red-600 my-2">Error you don't have this much money</p>
      <button
        type="submit"
        className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Deposit
      </button>
    </form>
    
  </div>
</div></div>
      
  )
}
export default Deposit;