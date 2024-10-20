import React, { useState } from 'react';
import { ethers } from 'ethers';

const Deposit = ({ contractAddress, abi }) => {
  const [ownerAddress, setOwnerAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeposit = async (e) => {
    e.preventDefault();
    setError(null); // Clear any previous errors
    setIsLoading(true);

    try {
      // Check if MetaMask is available
      if (!window.ethereum) {
        setError('MetaMask not detected. Please install it.');
        return;
      }

      // Request user's MetaMask account
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Connect to the smart contract
      const contract = new ethers.Contract(contractAddress, abi, signer);

      // Call the deposit function
      const tx = await contract.deposit(1, {
        value: ethers.utils.parseEther(amount), // Convert amount from Ether to Wei
      });

      await tx.wait(); // Wait for the transaction to be confirmed
      alert('Deposit successful!');
    } catch (err) {
      setError(err.message);
      console.error('Deposit failed:', err);
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };

  return (
    <div className="bg-blue-100 h-[100vh] p-8">
      <div className="flex flex-wrap ml-9 my-5">
        <div className="w-full max-w-full sm:w-1/4 mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Deposit</h1>

          <form onSubmit={handleDeposit}>
            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="ownerAddress" className="block text-gray-600">
                Owner Address
              </label>
              <input
                type="text"
                id="ownerAddress"
                name="ownerAddress"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="0x................................................................"
                value={ownerAddress}
                onChange={(e) => setOwnerAddress(e.target.value)}
              />
            </div>

            <div className="mb-4 bg-sky-100 relative">
              <label htmlFor="amount" className="block text-gray-600">
                Amount (in Ether)
              </label>
              <input
                type="text"
                id="amount"
                name="amount"
                className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"
                autoComplete="off"
                placeholder="Enter amount in Ether"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            {error && <p className="text-red-600 my-2">{error}</p>}

            <button
              type="submit"
              className="bg-red-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Deposit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
