import { useNavigate } from "react-router-dom";
import useTable from "../hooks/useTable";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";

export default function HomeButton() {
  const navigate = useNavigate();
  const { setTableInfo } = useTable();

  const handleGoHome = () => {
    // Reset table context.
    setTableInfo(null);
    // Navigate to "Sections" page.
    navigate("/sections");
  }

  return (
    <button 
      className="grey-btn h-10 w-10 p-2 text-lg rounded"
      onClick={handleGoHome}
    >
      <FontAwesomeIcon icon={ faHouse } />
    </button>
  );
}
