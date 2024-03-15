import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";

export default function PaymentSuccess() {
  const navigate = useNavigate();

  const backToTables = () => {
    navigate(`/sections`);
  }

  return (
    <div className="main--container">
      <div className="flex justify-between p-2">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex flex-col justify-center h-full w-full">
        <div className="grey-bg red-border px-4 py-8">
          <h3 className="success--header pb-5 font-bold tracking-wider">Thank you!</h3>
          <div className="flex flex-col">
            <p className="py-3 font-semibold tracking-wide">Would you like a receipt?</p>
            <div className="flex justify-between gap-4 font-bold w-full">
              <button 
                className="white-btn black-border p-1 w-full text-base rounded"
                onClick={backToTables}
              >
                Yes
              </button>
              <button 
                className="white-btn black-border p-1 w-full text-base rounded"
                onClick={backToTables}
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
