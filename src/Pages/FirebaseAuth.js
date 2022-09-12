/* eslint-disable jsx-a11y/anchor-is-valid */
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../App";
import firebaseConfig from "../firebase.config";
import FormLogo from "../images/Formlogo.jpg";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const FirebaseAuth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location:", location);

  const initialUser = {
    isSignedIn: false,
    name: "",
    email: "",
    photoURL: "",
  };
  const [user, setUser] = useState(initialUser);
  const [button, setButton] = useState("login");
  const [submit, setSubmit] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const provider = new GoogleAuthProvider();

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const { displayName, email, photoURL } = result.user;
        const newUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          photoURL: photoURL,
        };
        setLoggedInUser(newUser);
        navigate(location.state.from);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage, "errorCode:", errorCode);
      });
  };

  const handleBlur = (event) => {
    let isFieldValid = false;

    if (event.target.name === "password") {
      isFieldValid =
        /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,12}$/.test(
          event.target.value
        );
    }
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === "name") {
      if (event.target.value) {
        isFieldValid = true;
      }
    }

    if (isFieldValid) {
      const updateUser = user;
      updateUser[event.target.name] = event.target.value;
      updateUser.fieldErrorAlert = "";
      setUser({ ...updateUser });
    }
    if (!isFieldValid) {
      const newUser = { ...user };
      newUser.fieldErrorAlert = event.target.name;
      newUser[event.target.name] = "";
      setUser(newUser);
    }
  };
  const handleSubmit = (e) => {
    if (
      button === "signup" &&
      submit === true &&
      user.email &&
      user.name &&
      user.password
    ) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .then((res) => {
          updateUserName(user.name);
        })
        .catch((error) => {
          const newUser = { ...user };
          newUser.failure = error.message;
          newUser.success = false;
          setUser(newUser);
          setLoggedInUser(newUser);
        });
    }
    if (button === "login" && submit === true && user.email && user.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          console.log("userCredential:", userCredential);
          // Signed in
          const user = userCredential.user;

          const { displayName, email, photoURL } = user;
          console.log("email:", email);
          console.log("displayName:", displayName);
          const newUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photoURL: photoURL,
            failure: "",
            success: true,
          };
          setUser(newUser);
          setLoggedInUser(newUser);
          navigate(location.state.from);
        })
        .catch((error) => {
          console.log(error);
          const newUser = { ...user };
          newUser.failure = error.message;
          newUser.success = false;
          setLoggedInUser(newUser);
        });
      console.log(user);
    }
    e.preventDefault();
  };
  const updateUserName = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log("Username updated successfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
        <h2
          style={{ color: "#5e1313", marginBottom: "3rem", marginTop: "1rem" }}
        >
          Log In To Access the Recipe
        </h2>
        <FormBox onSubmit={handleSubmit} action="">
          <div className="btnContainer" style={btnContainer}>
            <FormTopButton
              onClick={() => {
                setButton("signup");
                setSubmit(false);
              }}
              className={button === "signup" ? "active" : ""}
            >
              SignUp
            </FormTopButton>
            <FormTopButton
              onClick={() => {
                setButton("login");
                setSubmit(false);
              }}
              className={button === "login" ? "active" : ""}
            >
              Login
            </FormTopButton>
          </div>
          <div className="inputContainer" style={inputContainer}>
            {user.fieldErrorAlert === "name" && (
              <small style={{ color: "#CB0101" }}> *Enter Your Name</small>
            )}
            {button === "signup" && (
              <FormInput
                id="formUserName"
                type={"text"}
                placeholder="Username"
                name="name"
                onBlur={handleBlur}
              />
            )}
            {user.fieldErrorAlert === "email" && (
              <small style={{ color: "#CB0101" }}> *invalid email</small>
            )}
            <FormInput
              id="formEmail"
              placeholder="Email"
              name="email"
              onBlur={handleBlur}
            />
            {user.fieldErrorAlert === "password" && (
              <h6 style={{ color: "#CB0101", textAlign: "center" }}>
                *password must have at least one digit and one special character
                and minimum contains 6 character
              </h6>
            )}
            <FormInput
              id="formPassword"
              type={"password"}
              placeholder="password"
              name="password"
              onBlur={handleBlur}
            />
            <input
              type="submit"
              onClick={() => {
                setSubmit(true);
              }}
              style={FormDownButton}
              value={button === "signup" ? "Signup" : "Login"}
            />
            <a style={{ marginTop: "1rem" }}>Login with Google</a>
            <div
              onClick={handleGoogleSignIn}
              className="google"
              style={{ fontSize: "25pt", cursor: "pointer" }}
            >
              <FcGoogle />
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
const formLogo = {
  width: "50%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
const formDetails = {
  width: "50%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start",
  alignItems: "center",
};

const btnContainer = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "2rem",
};
const inputContainer = {
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};
const FormBox = styled.form`
  position: relative;
  width: 80%;
  height: 75vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  background: lightblue;
  box-shadow: 2px 2px 10px grey;
  border-radius: 4px;
  padding: 2rem;
  overflow: hidden;
  .active {
    background: linear-gradient(to right, lightgreen, white);
  }
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
  padding: 3% 2rem;
  border-radius: 4px;
  cursor: pointer;
  background: white;
  font-weight: 600;
  font-size: 15pt;
`;
const FormDownButton = {
  border: "none",
  width: "81%",
  padding: "1% 2rem",
  borderRadius: "5px",
  cursor: "pointer",
  background: "tomato",
  fontWeight: 600,
  fontSize: "15pt",
};
