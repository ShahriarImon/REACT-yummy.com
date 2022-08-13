import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import styled from "styled-components";
import firebaseConfig from "../firebase.config";
import FormLogo from "../images/Formlogo.jpg";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const FirebaseAuth = () => {
  const provider = new GoogleAuthProvider();
  return (
    <Container>
      <div className="formLogo" style={formLogo}>
        <img
          src={FormLogo}
          alt=""
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
            boxShadow: "2px 2px 10px grey",
          }}
        />
      </div>
      <div className="formDetails" style={formDetails}>
        <FormBox>
          <div className="btnContainer" style={btnContainer}>
            <FormTopButton>SignUp</FormTopButton>
            <FormTopButton>Login</FormTopButton>
          </div>
          <div className="line" style={line}></div>
          <div className="total" style={total}>
            <div className="left" style={{ width: "50%" }}>
              <FormInput placeholder="Username" />
              <FormInput placeholder="Email" />
              <FormInput placeholder="password" />
              <FormDownButton>Register</FormDownButton>
            </div>
            <div className="right" style={right}>
              <FormInput placeholder="Email" />
              <FormInput placeholder="password" />
              <FormDownButton>Login</FormDownButton>
              <p style={{ marginTop: "1rem" }}>Login with Google</p>
              <div className="google" style={{ fontSize: "20pt" }}>
                <FcGoogle />
              </div>
            </div>
          </div>
        </FormBox>
      </div>
    </Container>
  );
};

export default FirebaseAuth;
const Container = styled.div`
  margin: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, white, lightgreen);
`;
const line = {
  position: "absolute",
  top: "75px",
  left: "128px",
  width: "6rem",
  height: "4px",
  background: "tomato",
  borderRadius: "6px",
  transform: "translateX(130%)",
  transition: "all 1s",
};
const FormBox = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: white;
  box-shadow: 2px 2px 10px grey;
  border-radius: 4px;
  padding: 2rem;
  overflow: hidden;
`;
const FormInput = styled.input`
  width: 80%;
  margin-bottom: 2rem;
  border-radius: 4px;
  padding: 2%;
  font-size: 15pt;
  text-align: center;
`;
const FormTopButton = styled.button`
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  font-weight: 600;
  font-size: 15pt;
`;
const FormDownButton = styled.button`
  border: none;
  width: 81%;
  padding: 1% 2rem;
  border-radius: 5px;
  cursor: pointer;
  background: tomato;
  font-weight: 600;
  font-size: 15pt;
`;

const formLogo = {
  width: "50%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const formDetails = {
  width: "50%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const btnContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const total = {
  position: "absolute",
  top: "115px",
  left: "69px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "180%",
  //   transform: "translateX(-55%)",
  transition: "all 1s",
};
const right = {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
