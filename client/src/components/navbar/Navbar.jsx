import { useEffect, useState, useRef } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUser = async () => {
        const storedUser = localStorage.getItem("UserIdId");

        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Convert back to object
        }
      };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await localStorage.removeItem("UserIdId");
    setUser(null);
    window.location.reload();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <nav className="navbar">
        <div className="logo">News Checker</div>

        <div className="rightsection">
          {user ? (
            <img
              src="https://takeuforward.org/static/media/user.2e001b856e90a7542ef2.jpg"
              alt="User"
              className="imgUser"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <Link to="/login" className="btn-22">
              <span>Login</span>
            </Link>
          )}
        </div>
      </nav>

      {user && open && (
        <div className="dropdown" ref={dropdownRef}>
          <div className="dropdown-header">
            <img
              src="https://takeuforward.org/static/media/user.2e001b856e90a7542ef2.jpg"
              alt="User"
              className="dropdown-img"
            />
            <div className="dropdown-user">Hi, {user?.name ||"User"}</div>
          </div>
          <button className="dropdown-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
