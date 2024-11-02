import { useRouter } from 'next/navigation';


const Pendingtranhistory = ({ request, approved }) => {
  const router = useRouter();
  const goToDetailPage = (id) => {
    if (approved) {
      router.push(`/requestwithdraw/approvedwithdraw/${id}`);
    } else {
      router.push(`/requestwithdraw/requestwithDrawdetail/${id}`);
    }
  };

  console.log("Withdraw ID:", request.withdrawId); // Check if withdrawId is valid
  return (
    <>

      <li className="p-3 flex justify-between items-center user-card" onClick={() => goToDetailPage(request.withdrawId)}>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full"
            src="https://unsplash.com/photos/oh0DITWoHi4/download?force=true&w=640"
            alt="Christy"
          />
          <span className="ml-3 font-medium">WIthdraw ID{Number(request.withdrawId)+1}</span>
        </div>
        <div>
          <button className="text-gray-500 hover:text-gray-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </li>
    </>
  )
}
export default Pendingtranhistory;