import { useState } from "react";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useTable from "../hooks/useTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function MenuItem({ item }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { isTester } = useAuth();
  const { tableInfo, setTableInfo } = useTable();

  const addItem = async (itemId) => {
    // Tester account cannot alter data.
    if (isTester) {
      return;
    }

    if (isProcessing) {
      return;
    }

    try {
      // Disable add buttons while request is processing.
      setIsProcessing(true);

      // Increment the quantity of the selected item by 1 in table object.
      const response = await axios.put(`${backendURL}/tables/addItem`, {
        tableInfo,
        itemId
      });

      console.log(response.data.msg);

      // Set updated table information in context.
      setTableInfo(response.data.table);
    } catch(err) {
      console.error("Error adding item.", err);
      alert("Error adding item.");
    } finally {
      // Enable add buttons once request completes.
      setIsProcessing(false);
    }
  }

  return (
    <div className="menu--item flex justify-between p-3 w-full">
      <div className="flex items-center justify-between h-10 w-full">
        <p className="pr-8">{ item.name }</p>
        <p className="pr-8">{ `$${item.price.toFixed(2)}` }</p>
      </div>
      <div className="self-center ml-0 px-2">
        <button
          className="menu--add-btn black-border rounded"
          onClick={() => addItem(item.id)}
          disabled={isProcessing || isTester}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}
