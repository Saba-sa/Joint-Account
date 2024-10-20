import React, { useState } from 'react';

const Siderbarowner = ({ accountAddr }) => {
  const [isFullAddressVisible, setIsFullAddressVisible] = useState(false);

  const shortenAddress = (address) => {
    return `${address.slice(0, 5)}...${address.slice(-3)}`;
  };

  const toggleAddressVisibility = () => {
    setIsFullAddressVisible((prev) => !prev);
  };

  return (
    <div className="flex items-center justify-between px-8 py-5">
      <div className="flex items-center mr-5">
        <div className="mr-5">
          <div className="inline-block relative shrink-0 cursor-pointer rounded-[.95rem]">
            {
              !isFullAddressVisible &&
              <img
                src="/images/avatar.png"
                alt="avatar"
                className='rounded-full w-14'
              />
            }</div>
        </div>

        <div className="mr-2">
          <a
            href="#"
            className="dark:hover:text-primary hover:text-primary transition-colors duration-200 ease-in-out text-[1.075rem] font-medium dark:text-neutral-400/90 text-secondary-inverse"
          >
            Owner
          </a>

          {/* Address */}
          <div className="text-secondary-dark dark:text-stone-500 font-medium text-[0.85rem]">
            {isFullAddressVisible ? (
              <div className="break-all">{accountAddr}</div> // Full address on a new line
            ) : (
              <span>{shortenAddress(accountAddr)}</span> // Shortened address
            )}
          </div>
        </div>
      </div>

      {/* Eye icon to toggle visibility */}
      <button
        onClick={toggleAddressVisibility}
        className="inline-flex items-center justify-end text-base font-medium cursor-pointer text-secondary-dark transition-colors duration-150"
      >
        {
          isFullAddressVisible ? <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" id="eye">
            <path fill="none" d="M0 0h48v48H0z"></path>
            <path d="M24 9C14 9 5.46 15.22 2 24c3.46 8.78 12 15 22 15 10.01 0 18.54-6.22 22-15-3.46-8.78-11.99-15-22-15zm0 25c-5.52 0-10-4.48-10-10s4.48-10 10-10 10 4.48 10 10-4.48 10-10 10zm0-16c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"></path>
          </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" id="eye">
              <g fill="none" fillRule="evenodd" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" >
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"></path>
            </g>
          </svg>


        }
      </button>
    </div>
  );
};

export default Siderbarowner;
