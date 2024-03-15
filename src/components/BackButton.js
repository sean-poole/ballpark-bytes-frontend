import { useNavigate, useLocation } from "react-router-dom";
import useTable from "../hooks/useTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setTableInfo } = useTable();

  const handleGoBack = () => {
    // Check if the user is currently on the "Table" page.
    if (location.pathname.startsWith("/sections") && location.state?.table) {
      // Reset the table context when navigating to "SeatingChart" from "Table".
      setTableInfo(null);
    }

    // Go back one page.
    navigate(-1);
  }

  return (
    <button
      className="grey-btn h-10 w-10 p-2 text-lg rounded"
      onClick={handleGoBack}
    >
      <FontAwesomeIcon icon={ faArrowLeft } />
    </button>
  );
}
