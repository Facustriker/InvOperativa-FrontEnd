import { Link, useLocation } from "react-router-dom";
import "../App.css";

function Header() {
  const location = useLocation();
  const isMainPage = location.pathname === "/";

  return (
    <header className={`App-header ${isMainPage ? "header-principal" : "header-logo-izquierda"}`}>
      {isMainPage ? (
        <>
          <h1>Bienvenido a InventAR.io</h1>
          
        </>
      ) : (
        <Link to="/" className="app-logo">
          InventAR.io
        </Link>
      )}
    </header>
  );
}

export default Header;