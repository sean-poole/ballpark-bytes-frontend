import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useTable from "../hooks/useTable";
import BackButton from "../components/BackButton";
import HomeButton from "../components/HomeButton";
import MenuItem from "../components/MenuItem";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function Menu() {
  const [menu, setMenu] = useState([]);
  const [menuHeader, setMenuHeader] = useState("");

  const { tableInfo } = useTable();
  const { location } = useParams();

  useEffect(() => {
    const getMenu = async () => {
      try {
        // Generate Menu Header
        switch(location) {
          case "s1": setMenuHeader("Stand 1"); break;
          case "s2": setMenuHeader("Stand 2"); break;
          case "s3": setMenuHeader("Stand 3"); break;
          case "DTR": setMenuHeader("DTR"); break;
          case "drinks": setMenuHeader("Drinks"); break;
          default: setMenuHeader(""); break;
        }

        // Get the selected location's menu on page load.
        const response = await axios.get(`${backendURL}/tables/getMenu/${location}`);
        // console.log(`Menu data: `, response.data);

        // Set location's menu in state for display.
        setMenu(response.data.menu);
      } catch(err) {
        console.error(`Error fetching menu.`, err);
        // Clear previous menu items.
        setMenu([]);
      }
    }

    // Get new menu when location changes.
    getMenu();
  }, [location, tableInfo]);

  return (
    <div className="main--container">
      <div className="flex justify-between p-2">
        <BackButton />
        <HomeButton />
      </div>
      <div className="flex flex-col items-center justify-start grow">
        <h2 className="pt-1 pb-5">
          { `${menuHeader} Menu` }
        </h2>
        <div className="menu--container white-bg grow overflow-y-auto">
          { /* GENERATE MENU ITEMS OR DISPLAY EMPTY MESSAGE */ }
          { menu.length > 0 ? (
              menu.map(item => (
                <MenuItem key={item.id} item={item} />
              ))
            ) : (
              <p className="empty-msg">No items available.</p>
            ) 
            }
        </div>
      </div>
    </div>
  );
}
