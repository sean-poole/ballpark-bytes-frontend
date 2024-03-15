import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import useTable from "../hooks/useTable";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function CheckoutForm({ clientSecret, total }) {
  const [errMsg, setErrMsg] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { isTester } = useAuth();
  const { tableInfo } = useTable();

  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Tester account cannot alter data.
    if (isTester) {
      return;
    }

    if (!stripe || !elements) {
      return;
    }

    // Disable payment button while request is processing.
    setIsProcessing(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)
      }
    });

    if (error) {
      setErrMsg(error.message);
      setIsProcessing(false);
    } else if (paymentIntent.status === "succeeded") {
      setIsProcessing(false);

      try {
        // Send tableInfo object and total price to 'receipts' table.
        const receiptResponse = await axios.post(`${backendURL}/payment/createReceipt`, {
          tableInfo,
          total
        });

        console.log(receiptResponse.data);

        if (receiptResponse.data.success) {
          // Clear current tableInfo object in 'tables' table.
          const deleteResponse = await axios.put(`${backendURL}/payment/deleteTableInfo`, {
            tableInfo
          });

          console.log(deleteResponse.data);
        }

        navigate("success");
      } catch(err) {
        console.error("Error creating receipt.", err);
      }
    }
  }

  return (
    <div className="white-bg p-2">
      <form className="payment--form" onSubmit={handleSubmit}>
        <div className="black-border p-2 rounded">
          <CardElement />
        </div>
        <button 
          className="grey-btn black-border py-1 mt-5 w-full rounded"
          disabled={isProcessing || isTester}
        >
          <p className="font-semibold tracking-wider">
            {isProcessing ? "Processing..." : "Confirm payment"}
          </p>
        </button>
        { /* DISPLAY ANY ERROR MESSAGES */ }
        { errMsg && <div className="errmsg font-semibold">{errMsg}</div> }
      </form>
    </div>
  );
}
