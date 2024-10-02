
const provider=new ethers.providers.Web3Provider(window.ethereum);
const abi=[
  //bring this deployment abi from deployment.js after deplyment
];
const address="0x"
let contract=null;

async function createAccounts() {
  await getAccess();
  const owners=document.getElementById("owners").innerText.split(",").filter(n=>n);
  await contract.createAccount(owners).then(()=>alert("Successfully created"))
}

async function viewAccounts() {
  await getAccess();
  const result=await contract.getAccounts();
  document.getElementById("accounts").innerHTML=result;
}

async function getAccess(){
  if(contract) return;
  await provider.send("eth_requestAccounts",[]);
  const signer=provider.getSigner();
  contract =new ethers.Contract(address,abi,signer)

  const eventLog=document.getElementById("events");
  contract.on("AccountCreated",(owners,id,event) => {
eventLog.append(`Account created: ID= ${id},Owners=${owners}`)
  })
}




