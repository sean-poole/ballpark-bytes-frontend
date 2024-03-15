import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useTable from "../hooks/useTable";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import DiscountsModal from '../components/DiscountsModal';
import OrderDisplay from '../components/OrderDisplay';

export default function Table() {
  const [showDiscountsModal, setShowDiscountsModal] = useState(false);
  const [hasDiscount, setHasDiscount] = useState(false);

  const navigate = useNavigate();
  const { tableInfo } = useTable();

  useEffect(() => {
    setHasDiscount(tableInfo.discount ? true : false);
  }, [tableInfo]);

  const handleMenuClick = (location) => {
    // Navigate to selected location's "Menu" page where user can order menu items.
    navigate(`/menu/${location}`);
  }

  const handlePayClick = () => {
    // Navigate to current table's "Payment" page where user can enter payment information.
    navigate(`payment`);
  }

  return (
    <div className="main--container">
      <div className="flex justify-between p-2">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex flex-col items-center justify-start grow">
        <h2>
          { `${tableInfo.section === "box-suite" ? "Suite" : "Table"} ${tableInfo.tableNumber}` }
        </h2>
        <div className="grid grid-cols-3 gap-2 py-4">
          <button
            className="red-btn menu-btn rounded"
            onClick={() => handleMenuClick('s1')}
          >
            Stand 1
          </button>
          <button
            className="red-btn menu-btn rounded"
            onClick={() => handleMenuClick('s2')}
          >
            Stand 2
          </button>
          <button
            className="red-btn menu-btn rounded"
            onClick={() => handleMenuClick('s3')}
          >
            Stand 3
          </button>
          <button
            className="red-btn menu-btn rounded"
            onClick={() => handleMenuClick('DTR')}
          >
            DTR
          </button>
          <button
            className="red-btn menu-btn rounded"
            onClick={() => handleMenuClick('drinks')}
          >
            Drinks
          </button>
          <button
            className={`${hasDiscount ? "green-btn" : "red-btn"} menu-btn rounded`}
            onClick={() => setShowDiscountsModal(true)}
          >
            Discounts
          </button>
        </div>

        { /* GENERATE DISCOUNTS COMPONENT WHEN BUTTON IS CLICKED */ }
        { showDiscountsModal && (
          <DiscountsModal 
            onClose={() => setShowDiscountsModal(false)}
          />
        ) }

        <OrderDisplay location="table" />

        <div className="p-4 w-full">
          <button
            className="grey-btn p-1 w-full font-semibold text-2xl tracking-widest rounded"
            onClick={handlePayClick}
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
}
