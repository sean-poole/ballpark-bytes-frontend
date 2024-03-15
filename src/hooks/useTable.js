import { useContext } from "react";
import TableContext from "../context/TableProvider";

export default function useTable() {
  return useContext(TableContext);
}
