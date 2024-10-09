const CreateAccount = () => {
  return(
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
          id="owner1"
          name="owner1"
          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
          autoComplete="off"
          placeholder="0x................................................................"
        />
      </div>
      <div className="mb-4 bg-sky-100 relative">
        <label htmlFor="owner2" className="block text-gray-600">Owner 02</label>
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
        <label htmlFor="owner3" className="block text-gray-600">Owner 03</label>
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
      <button
        type="submit"
        className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
      >
        Create Account
      </button>
    </form>
    
  </div>
</div>

    </>
  )
}

export default CreateAccount;