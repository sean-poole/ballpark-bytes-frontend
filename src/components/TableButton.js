import { useNavigate } from "react-router-dom";
import useTable from "../hooks/useTable";

export default function TableButton({ table }) {
  const navigate = useNavigate();
  const { setTableInfo } = useTable();

  const handleClick = (table) => {
    // Set selected table object in context.
    setTableInfo(table);
    // Navigate to "Table" page where user can view menus of different locations.
    navigate(`${table.id}`);
  }

  return (
    <div className="">
      <button 
        className="table-button grey-btn text-2xl rounded"
        onClick={() => handleClick(table)}
      >
        { `${table.section === 'box-suite' ? '' : 'Table'} ${table.tableNumber}` }
      </button>
    </div>
  );
}
