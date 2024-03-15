import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App.js';
import { AuthProvider } from "./context/AuthProvider";
import { TableProvider } from "./context/TableProvider";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TableProvider>
          <Routes>
            <Route path="/*" element={ <App /> }/>
          </Routes>
        </TableProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
