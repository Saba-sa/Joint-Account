"use client";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "./store/AppContext";
import { createAccount, loadAccount, accountHistory } from "./store/actions";
import { useRouter } from "next/navigation";
import Image from 'next/image';



const CreateAccount = () => {

  const { state, dispatch } = useContext(AppContext);


  const [accountAddr, setaccountAddr] = useState([
    {
      add1: ""
    },
    {
      add2: ""
    },
    {
      add3: ""
    },
  ]);
  const [userAccount, setuserAccount] = useState([]);
  const route = useRouter();

  useEffect(() => {
    const getOtherAccounts = async () => {
      if (state?.contract) {

        try {
          const accounts = await state.contract.getAccounts();
          setaccountAddr([...accounts]);

        }
        catch (e) {
          console.log('error', e)

        }
      }
    }
    getOtherAccounts();
  }, [state.contract])

  const AddOwners = async (e) => {
    e.preventDefault();
    const addresses = [
      accountAddr[0]?.add1,
      accountAddr[1]?.add2,
      accountAddr[2]?.add3,
    ];

    if (addresses.some((addr) => !addr || addr.length !== 42)) {
      alert("Please enter valid addresses (42 characters long).");
      return;
    }

    if (state?.contract) {
      try {
        state.contract.once('AccountCreated', (owners, id, timestamp) => {
          const temp = {
            owners: [...owners],
            id: id,
            balance: 0,
            timestamp: timestamp,
          };
          dispatch(createAccount(temp));
          dispatch(loadAccount(temp));
        });

        // Call createAccount
        const result = await state.contract.createAccount(addresses, {
          gasLimit: 1000000,
        });
        await result.wait();

        const receipt = await result.wait();
        if (receipt) {
          dispatch(accountHistory(['Account Created']));
          route.push(`/deposit`);
        }

      } catch (error) {
        console.error("Error creating account:", error);
        alert("Failed to create account. See console for details.");
      }
    } else {
      console.error("Contract is not initialized.");
    }
  };

  const openTheExistedAccount = async (i) => {
    const details = await state.contract.getAccountDetails(i);

    const ownersArray = Array.from(details[0]);
    const accountData = {
      owners: ownersArray,
      id: i,
      balance: details[1].toString(),
    };

    dispatch(loadAccount(accountData));
    const history = [
      ...state.accountHistory,
      'log in to account'
    ];
    dispatch(accountHistory(history));


    route.push(`/deposit`);
  }

  return (
    <>
      <div className="bg-sky-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <Image
            src="/images/rightimg.png"
            alt="Placeholder Image"
            width={100}
            height={100}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right: Login Form */}
        <div className="lg:p-36 md:p-52 sm:p-20 p-8 w-full lg:w-1/2">
          {accountAddr.length > 0 && <>
            <h1 className="text-2xl font-semibold mb-4">Your Accounts</h1>
            <div className="flex items-center justify-between px-8 py-5">
              {accountAddr?.map((item, i) => {
                return <div className="flex items-center mr-5" key={i} onClick={() => openTheExistedAccount(Number(item))}>
                  <div className="mr-5">
                    <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                      <Image
                        src='/images/accounts.png'
                        alt="avatar image"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                  <div className="mr-2 ">
                    <span
                      href="#"
                      className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
                    >
                      Account Id:{Number(item)}
                    </span>

                  </div>
                </div>
              })}
            </div>

          </>}
          <>       <h1 className="text-2xl font-semibold mb-4">Creating Account</h1>
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
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10  focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  placeholder="0x................................................................"
                  value={accountAddr[0]?.add1 || ''}
                  onChange={e => setaccountAddr([{ ...accountAddr[0], add1: e.target.value }, accountAddr[1], accountAddr[2]])} />
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
                  className="w-full border border-gray-300 rounded-md py-2 px-3  pr-10 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  placeholder="0x................................................................"
                  value={accountAddr[1]?.add2 || ''}
                  onChange={e => setaccountAddr([accountAddr[0], { ...accountAddr[1], add2: e.target.value }, accountAddr[2]])}
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
                  className="w-full border border-gray-300 rounded-md py-2 px-3 pr-10 focus:outline-none focus:border-blue-500"
                  autoComplete="off"
                  placeholder="0x................................................................"
                  value={accountAddr[2]?.add3 || ''}
                  onChange={(e) =>
                    setaccountAddr([
                      accountAddr[0],
                      accountAddr[1],
                      { ...accountAddr[2], add3: e.target.value },
                    ])
                  }
                />
              </div>
              <button
                type="submit"
                className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
                onClick={(e) => AddOwners(e)}>
                Create Account
              </button>
            </form>
          </>
        </div>
      </div>

    </>
  )
};

export default CreateAccount;
