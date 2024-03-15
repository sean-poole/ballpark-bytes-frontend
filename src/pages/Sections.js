import { useNavigate } from "react-router-dom";
import Logout from "../components/Logout";

export default function SeatingSections() {
  const navigate = useNavigate();

  const handleSection = (section) => {
    // Navigate to "SeatingChart" page displaying all tables within the selected section.
    navigate(`${section}`);
  }

  return (
    <div className="main--container">
      <div className="flex flex-col items-center justify-center grow text-3xl">
        <button 
          className="section-btn grey-btn red-border rounded"
          onClick={() => handleSection("first-base")}
        >
          1st Base
        </button>
        <button 
          className="section-btn grey-btn red-border rounded"
          onClick={() => handleSection("third-base")}
        >
          3rd Base
        </button>
        <button 
          className="section-btn grey-btn red-border rounded"
          onClick={() => handleSection("box-suite")}
        >
          Box Suites
        </button>
      </div>

      <div className="mt-auto">
        <Logout />
      </div>
    </div>
  );
}
