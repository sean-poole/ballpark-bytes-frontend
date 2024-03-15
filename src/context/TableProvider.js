import { createContext, useState } from "react";

const TableContext = createContext();

export function TableProvider({ children }) {
  const [tableInfo, setTableInfo] = useState(null);

  return (
    <TableContext.Provider value={{ tableInfo, setTableInfo }}>
      { children }
    </TableContext.Provider>
  );
}

export default TableContext;
