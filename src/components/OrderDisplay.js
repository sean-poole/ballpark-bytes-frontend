import useTable from "../hooks/useTable";
import OrderedItem from "./OrderedItem";

export default function OrderDisplay({ location }) {
  const { tableInfo } = useTable();

  return (
    <div className="flex flex-col grow w-full">
      <div className={`${location}--container grow white-bg p-2 w-full overflow-y-auto`}>
        { /* GENERATE ORDERED ITEMS WITHIN TABLE OR DISPLAY EMPTY MESSAGE */ }
        { tableInfo.items.length !== 0 ? (
            tableInfo.items.map(item => (
              <OrderedItem key={item.id} item={item} location={location} />
            ))  
          ) : (
            <p className="empty-msg">No items ordered.</p>
          ) 
        }
      </div>
    </div>
  );
}
