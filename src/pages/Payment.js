import { useState, useEffect } from "react";
import axios from "axios";
import useTable from "../hooks/useTable";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import OrderDisplay from "../components/OrderDisplay";
import CheckoutForm from "../components/CheckoutForm";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function Payment() {
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const { tableInfo } = useTable();

  useEffect(() => {
    const calculateTotalPrice = () => {
      // Check if tableInfo has items.
      if (tableInfo.items && tableInfo.items.length > 0) {
        let totalAmount = 0;
        // Calculate the price of all ordered items in tableInfo.
        tableInfo.items.forEach(item => {
          totalAmount += (item.price * item.quantity);
        });
    
        // Calculate tax (CA).
        let taxAmount = totalAmount * 0.0875;
        setTax(taxAmount.toFixed(2));
    
        // If a discount is applied...
        if (tableInfo.discount > 0) {
          // Calculate discount amount.
          let discountAmount = totalAmount * (tableInfo.discount * 0.01);
          setDiscount(discountAmount.toFixed(2));
          // Subtract discount amount from total.
          totalAmount -= discountAmount;
        }
    
        // Sum the price of all items and tax for total amount.
        totalAmount += taxAmount;
        setTotal(totalAmount.toFixed(2));
      } else {
        // If tableInfo has no items, set total, tax, and discount to zero.
        setTotal(0);
        setTax(0);
        setDiscount(0);
      }
    }

    calculateTotalPrice();
    // Recalculate when tableInfo updates.
  }, [tableInfo]);

  useEffect(() => {
    // Check if a total price has been calculated.
    if (total) {
      const fetchKeys = async (total) => {
        try {
          // Fetch publishable key and client secret.
          const [configResponse, intentResponse] = await Promise.all([
            axios.get(`${backendURL}/payment/config`),
            axios.post(`${backendURL}/payment/createPaymentIntent`, {
              tableInfo,
              total
            })
          ]);
    
          // Extract data from response.
          const { publishableKey } = configResponse.data;
          const { clientSecret } = intentResponse.data;
    
          // Set stripe promise and client secret.
          setStripePromise(loadStripe(publishableKey));
          setClientSecret(clientSecret);
        } catch(err) {
          console.error("Error fetching payment details: ", err);
          setErrMsg("Error fetching payment details.");
        }
      }

      fetchKeys(total);
    }
  }, [tableInfo, total]);

  return (
    <div className="main--container">
      <div className="flex justify-between p-2">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex flex-col items-center justify-start grow">
        <OrderDisplay discount={tableInfo.discount} location="payment" />
        <div className="white-bg flex justify-end my-2 p-2 w-full">
          <div className="flex flex-col text-end w-20">
            { /* SHOW DISCOUNT LABEL WHEN APPLIED */ }
            { discount > 0 && <p>Discount: </p> }
            <p>Tax: </p>
            <p>Total: </p>
          </div>
          <div className="flex flex-col text-end w-20">
            { /* SHOW DISCOUNT AMOUNT WHEN APPLIED */ }
            { discount > 0 && <p>{ `- $${discount}` }</p> }
            <p>{ `$${tax}` }</p>
            <p>{ `$${total}` }</p>
          </div>
        </div>
      </div>
      <div>
        { /* DISPLAY PAYMENT WINDOW */ }
        { stripePromise && clientSecret && (
          <Elements stripe={stripePromise} options={{ clientSecret }} >
            <CheckoutForm clientSecret={clientSecret} total={total} />
          </Elements>
        ) }
        { /* DISPLAY ANY ERROR MESSAGES */ }
        { errMsg && <p className="errmsg">{errMsg}</p> }
      </div>
    </div>
  );
}
