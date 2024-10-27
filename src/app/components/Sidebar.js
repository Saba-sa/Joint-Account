"use client";
import React, { useContext, useEffect, useRef, useState } from 'react';
import Siderbarowner from "./Siderbarowner";
import { AppContext } from "../store/AppContext";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const hasFetchedBalance = useRef(false);

  const route = useRouter();


  useEffect(() => {
    const getBalance = async () => {
      if (!state.contract) return; // Early return if contract is not initialized
      console.log('state', state)
      try {
        const accountId = Number(state?.activeAccount?.id);
        const result = await state.contract.getBalance(accountId, { gasLimit: 1000000 });
        console.log('Balance:', result.toString());

        if (!hasFetchedBalance.current) {
          dispatch({
            type: 'SET_ACTIVE_ACCOUNT',
            payload: { ...state.activeAccount, balance: result },
          });
          hasFetchedBalance.current = true; // Mark as fetched
        }
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    if (state?.activeAccount) {
      getBalance();
    }
  }, [state.activeAccount?.id]); // Only trigger when the ID changes


  return (
    <>
      <div className="flex flex-col w-full bg-white mx-auto">
        <aside
          className="group/sidebar flex flex-col shrink-0 lg:w-[300px] w-[250px] transition-all duration-300 ease-in-out m-0 fixed z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed-start loopple-fixed-start"
          id="sidenav-main"
        >
          <div className="flex items-center justify-between px-8 py-5">
            <div className="flex items-center mr-5">
              <div className="mr-5">
                <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
                  <img
                    className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                    src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/riva-dashboard-tailwind/img/avatars/avatar1.jpg"
                    alt="avatar image"
                  />
                </div>
              </div>
              <div className="mr-2 ">
                <a
                  href="#"
                  className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
                >
                  Account Id: {Number(state?.activeAccount?.id)}
                </a>
                <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">
                  Account Balance: {Number(state?.activeAccount?.balance)}
                </span>
              </div>
            </div>
          </div>

          <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
          {state.activeAccount?.owners?.map((account, index) => {
            return <Siderbarowner key={index} accountAddr={account} />
          })
          }


          <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200">
            <ol className='p-4'>
              {
                state?.accountHistory?.map((task, i) => {
                  return <li key={i} className='mb-2'>{task}</li>
                })
              }
            </ol>
          </div>
        </aside>

        <nav className="flex  h-auto bg-white shadow-lg rounded-lg justify-end md:h-16">
          <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
            <button>Deposit</button>
            <button onClick={() => {
              route.push('/requestwithdraw')
            }}>Withdraw</button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
