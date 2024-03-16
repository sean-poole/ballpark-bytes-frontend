import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useTable from "../hooks/useTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function DiscountsModal({ onClose }) {
  const [customDiscount, setCustomDiscount] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { isTester } = useAuth();
  const { tableInfo, setTableInfo } = useTable();

  const handleSelectDiscount = async (discount) => {
    // Tester account cannot alter data.
    if (isTester) {
      return;
    }

    try {
      // Add discount amount to table object.
      const response = await axios.put(`${backendURL}/tables/applyDiscount`, {
        tableInfo,
        discount
      });

      console.log(response.data.msg);

      // Set updated table information in context.
      setTableInfo(response.data.table);
      // Clear any previous error messages.
      setErrMsg("");
    } catch(err) {
      console.error("Error applying discount: ", err);
      setErrMsg("Discount could not be applied.");
    }

    onClose();
  }

  return (
    <div className="modal--overlay flex items-center justify-center">
      <div className="black-bg red-border flex flex-col p-5 rounded">
        <button 
          className="white-btn self-end text-xl px-3 py-1 rounded" 
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <h3 className="mt-4 font-medium">Select Discount: </h3>
        <div className="grid grid-cols-2 gap-x-2">
          <button 
            className="white-btn text-xl mb-1 p-1 rounded" 
            onClick={() => handleSelectDiscount(5)}
            disabled={isTester}
          >
            5%
          </button>
          <button 
            className="white-btn text-xl mb-1 p-1 rounded" 
            onClick={() => handleSelectDiscount(10)}
            disabled={isTester}
          >
            10%
          </button>
          <button 
            className="white-btn text-xl mt-1 p-1 rounded" 
            onClick={() => handleSelectDiscount(15)}
            disabled={isTester}
          >
            15%
          </button>
          <button 
            className="white-btn text-xl mt-1 p-1 rounded" 
            onClick={() => handleSelectDiscount(20)}
            disabled={isTester}
          >
            20%
          </button>
        </div>
        <div className="flex flex-col my-2">
          <input
            type="number"
            className="p-2 mb-8 text-xl rounded"
            value={customDiscount}
            onChange={(e) => setCustomDiscount(e.target.value)}
            placeholder="Custom amount (%)"
          />
          <button 
            className="grey-btn p-1 w-full font-semibold text-xl tracking-widest rounded"
            onClick={() =>handleSelectDiscount(customDiscount)}
            disabled={isTester}
          >
            Apply
          </button>
          { /* DISPLAY ANY ERROR MESSAGES */ }
          { errMsg && <p className="errmsg" aria-live="assertive">{errMsg}</p> }
        </div>
      </div>
    </div>
  );
}
