import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch user profile");
        }
        return response.json();
      })
      .then((data) => {
        setUserInfo(data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  function logout() {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          setUserInfo(null);
        } else {
          throw new Error("Failed to logout");
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  }

  const username = userInfo?.username;

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="logo">
            Myblog
          </Link>
          <div className="navbar-links">
            {username ? (
              <>
                <Link to="/create">Create New Post</Link>
                <Link to="/profile">Profile</Link>
                <a onClick={logout}>Logout</a>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
