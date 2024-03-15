import React from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const { auth } = useAuth();

  return (
    <header className="header--container flex items-center justify-center">
      {auth ? (
        <Link to="/sections">
          <h1 className="text-center tracking-widest">Ballpark Bytes</h1>
        </Link>
      ) : (
        <Link to="/" className="">
          <h1 className="text-center tracking-widest">Ballpark Bytes</h1>
        </Link>
      )}
    </header>
  );
}
