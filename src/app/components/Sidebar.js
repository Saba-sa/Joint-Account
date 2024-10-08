"use client"
import React, { useState } from 'react';
      import Siderbarowner from "./Siderbarowner";
      import { useContract } from "../store/AppContext";
      const Sidebar=()=>{
  const [open, setOpen] = useState(false);
  const {state}=useContract();
  return(
<>
    <div className=" flex flex-col w-full bg-white mx-auto">
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
                Joint Account Id:{state.accountId}
              </a>
              <span className="text-secondary-dark dark:text-stone-500 font-medium block text-[0.85rem]">
                Account Balance:{state.balance}
              </span>
            </div>
          </div>
          </div>
      
        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>
<Siderbarowner/>
<Siderbarowner/>
<Siderbarowner/>
<Siderbarowner/>
        

        <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200">
        <p>Account History</p>
        <p>Account History</p>
        <p>Account History</p>
        <p>Account History</p>
        </div>

       {/* in mobile screen make this accessible otherwise not */}
        {/* <div className="relative pl-3 my-5 ">
          <div className="flex flex-col w-full font-medium">
            <div>
              <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <a
                  href="#"
                  className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                >
                  Deposit
                </a>
              </span>
            </div>

            <div>
              <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                <a
                  href="#"
                  className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark"
                >
                  Withdraw Requests
                </a>
              </span>
            </div>


          
          </div>
        </div> */}
      </aside>
      <nav className="flex  h-auto bg-white shadow-lg rounded-lg justify-end md:h-16  ">
         
          <div className="hidden w-1/5 items-center justify-evenly font-semibold md:flex">
            <button>Deposit</button>
            <button>Withdraw</button>
        </div>
      </nav>
 
    </div>

</>
)

}
export default Sidebar;