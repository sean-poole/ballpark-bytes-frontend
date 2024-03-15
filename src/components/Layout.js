import { Outlet } from "react-router-dom";

import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  return (
    <main className="App flex flex-col items-center justify-between">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
