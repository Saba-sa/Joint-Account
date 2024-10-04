// pages/index.js
// import { useEffect, useState } from 'react';
// import { ethers } from 'ethers';
import CreateAccount from './components/CreateAccount';
// Import other components as needed

const Home = () => {
  // const [contract, setContract] = useState(null);

  const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
  // const abi = [ /* Your contract ABI here */];

  // useEffect(() => {
  //   const loadContract = async () => {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     const contractInstance = new ethers.Contract(contractAddress, abi, signer);
  //     setContract(contractInstance);
  //   };

  //   loadContract();
  // }, []);

  return (
    <div>
      {/* <CreateAccount /> */}
      {/* Include other components like Deposit, RequestWithdrawal, etc. */}
    </div>
  );
};

export default Home;

