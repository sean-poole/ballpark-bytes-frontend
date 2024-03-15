import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import TableButton from "../components/TableButton";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function SeatingChart() {
  const [tables, setTables] = useState([]);
  const [sectionHeader, setSectionHeader] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const { section } = useParams();

  useEffect(() => {
    // Generate page header based on selected section.
    switch(section) {
      case "first-base": setSectionHeader("First Base Tables"); break;
      case "third-base": setSectionHeader("Third Base Tables"); break;
      case "box-suite": setSectionHeader("Box-Suites"); break;
      default: setSectionHeader(""); break;
    }
  }, [section]);

  useEffect(() => {
    const getSectionTables = async () => {
      try {
        // Get all tables within the selected section on page load.
        const response = await axios.get(`${backendURL}/getSectionTables/${section}`);

        // Set returned tables data in state.
        setTables(response.data.tables);
        // Ready to render TableButton components.
        setIsMounted(true);
        // Clear any previous error messages.
        setErrMsg("");
      } catch(err) {
        console.error(`Error fetching tables.`, err);
        setErrMsg("Error fetching tables. Please try again later.");
      }
    }

    // Get new tables when section changes.
    getSectionTables();
  }, [section]);

  return (
    <div className="main--container">
      <div className="flex justify-between p-2">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex flex-col items-center justify-start grow">
        <h3 className="text-center py-3">
          { sectionHeader }
        </h3>
        <div className="flex flex-wrap justify-evenly gap-6 py-5 max-w-lg">
          { /* GENERATE TABLES WITHIN SELECTED SECTION */ }
          { isMounted ? (
            tables.map(table => (
              <TableButton key={table.id} table={table} />
            ))
          ) : (
            <h4 className="my-10 text-white">Fetching tables...</h4>
          )}
        </div>
        { /* DISPLAY ANY ERROR MESSAGES */}
        { errMsg && <p className="errmsg" aria-live="assertive">{errMsg}</p>}
      </div>
    </div>
  );
}
