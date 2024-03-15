import { Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";

import Login from "./pages/Login";
import Sections from "./pages/Sections";
import SeatingChart from "./pages/SeatingChart";
import Table from "./pages/Table";
import Menu from "./pages/Menu";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        { /* Public Routes */}
        <Route path="/" element={ <Login /> } />
        
        { /* Private Routes */}
        <Route element={ <RequireAuth /> }>
          <Route path="sections" element={ <Sections /> } />
          <Route path="sections/:section" element={ <SeatingChart /> } />
          <Route path="sections/:section/:id" element={ <Table /> } />
          <Route path="menu/:location" element={ <Menu /> } />
          <Route path="sections/:section/:id/payment" element={ <Payment /> } />
          <Route path="sections/:section/:id/payment/success" element={ <PaymentSuccess/> } />
        </Route>

        { /* Catch All */}

      </Route>
    </Routes>
  );
}
