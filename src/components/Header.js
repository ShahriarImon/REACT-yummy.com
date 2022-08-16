/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import logo from "../images/YummyLogo.png";
import { getAuth, signOut } from "firebase/auth";
const Header = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  console.log("input:", input);
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/searched/" + input);
  };
  const handleLogo = (e) => {
    navigate("/");
  };
  const handleGoogleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        const newUser = {
          isSignedIn: false,
          name: "",
          email: "",
          photoURL: "",
        };
        setLoggedInUser(newUser);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        onClick={handleLogo}
        className="logo"
        style={{
          width: "6%",
          marginTop: "1%",
        }}
      >
        <img
          src={logo}
          alt=""
          className="images"
          style={{
            width: "100%",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        />
      </div>
      <div
        style={{
          width: "60%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SearchForm onSubmit={handleSubmit}>
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            // value={input}
          />
          {console.log("input:", input)}
          <BiSearch />
        </SearchForm>
      </div>
      {loggedInUser.isSignedIn == true ? (
        <div>
          <a
            style={{ width: "6rem" }}
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {loggedInUser.name}
          </a>
          <ul className="dropdown-menu">
            <li>
              <a className="dropdown-item" onClick={handleGoogleSignOut}>
                Sign Out
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <a
            style={{ width: "6rem" }}
            className="nav-link dropdown-toggle"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Account
          </a>
          <ul className="dropdown-menu">
            <li>
              <Link to={"/account"}>
                <a className="dropdown-item">Log In/Register</a>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Header;

const SearchForm = styled.form`
  position: relative;

  width: 90%;

  input {
    /* margin-left: 18%; */
    width: 100%;
    background-color: black;
    border: none;
    color: white;
    padding: 0.5rem 3rem;
    border-radius: 1rem;
    outline: none;
    font-size: 110%;
  }
  svg {
    position: absolute;
    left: 3%;
    font-size: 120%;
    top: 29%;
    color: white;
  }
`;
