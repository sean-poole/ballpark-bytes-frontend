import axios from "axios";
import useAuth from "../hooks/useAuth";

const backendURL = process.env.REACT_APP_BACKEND_URL;

export default function Logout() {
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      // Terminate current session.
      const response = await axios.post(`${backendURL}/logout`);

      console.log(response.data);

      // Clear auth context.
      logout();
    } catch(err) {
      console.error("Error logging out: ", err);
    }
  }

  return (
    <button
      className="logout-button red-btn p-2 font-bold text-xl tracking-widest w-full rounded"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
