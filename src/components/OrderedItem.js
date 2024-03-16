import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useTable from "../hooks/useTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function OrderedItem({ item, location }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { isTester } = useAuth();
  const { tableInfo, setTableInfo} = useTable();

  const removeItem = async (itemId) => {
    // Tester account cannot alter data.
    if (isTester) {
      return;
    }

    // Disable remove buttons while request is processing.
    setIsProcessing(true);

    try {
      // Decrement the quantity of the selected item by 1 in table object.
      const response = await axios.put(`${backendURL}/tables/removeItem`, {
        tableInfo,
        itemId
      });
      
      console.log(response.data.msg);

      // Set updated table information in context.
      setTableInfo(response.data.table);
    } catch(err) {
      console.error("Error removing item.", err);
      alert("Error removing item.");
    } finally {
      // Enable remove buttons once request completes.
      setIsProcessing(false);
    }
  }

  return (
    <div className="flex p-1 w-full">
      <div className="flex items-center h-10 w-1/2">
        <p>{ item.name }</p>
      </div>
      <div className="flex items-center justify-between ml-0 w-1/2">
        <p>{ `x ${item.quantity}` }</p>
        <p>{ `$${(item.price * item.quantity).toFixed(2)}` }</p>
        { location === "table" && (
          <button
            className="table--remove-btn black-border rounded"
            onClick={() => {removeItem(item.id)}}
            disabled={isProcessing || isTester}
          >
            <FontAwesomeIcon icon={faMinus} />
          </button>
        )}
      </div>
    </div>
  );
}
