import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Quotes from "./pages/Quotes";
import Profile from "./pages/Profile";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/login";
  };

  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      {user && (
  <Link to="/home" className="navbar-brand">Начална страница</Link>
)}


  <div className="collapse navbar-collapse">
    <ul className="navbar-nav me-auto">
      {user ? (
        <>
          <li className="nav-item">
            <Link to="/quotes" className="nav-link">Цитати</Link>
          </li>
          <li className="nav-item">
            <Link to="/profile" className="nav-link">Профил</Link>
          </li>
        </>
      ) : (
        <>
          <li className="nav-item">
            <Link to="/register" className="nav-link">Регистрация</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link">Вход</Link>
          </li>
        </>
      )}
    </ul>

    {user && (
      <div className="d-flex align-items-center">
        <span className="text-white me-3">Здравей, {user?.name ?? user?.email}</span>
        <button onClick={handleLogout} className="btn btn-outline-light btn-sm">Изход</button>
      </div>
    )}
  </div>
</nav>


      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/quotes" element={<Quotes />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
