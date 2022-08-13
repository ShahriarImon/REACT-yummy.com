import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/YummyLogo.png";

const Search = () => {
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
  );
};

export default Search;

const SearchForm = styled.form`
  position: relative;

  width: 90%;

  input {
    margin-left: 18%;
    width: 51%;
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
    left: 20%;
    font-size: 120%;
    top: 26%;
    color: white;
  }
`;
