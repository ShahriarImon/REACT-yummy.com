import React from "react";
import styled from "styled-components";

const StyledCom = () => {
  return <div></div>;
};

export default StyledCom;
export const Wrapper = styled.div`
  text-align: center;
  margin: 2rem 0rem;
  h1 {
    margin-bottom: 1rem;
  }
`;
export const Card = styled.div`
    position: relative
    text-align: center;
    min-width: 15rem;
    border-radius: 2rem;
    img{
        width: 100%;
        height: 100%;
        border-radius: 2rem;
        object-fit: cover;
    }
    p{
        position: absolute;
        bottom: 0%;
        left: 12%;
        z-index: 10;
        color: white;
        border-radius: 2rem;
        font-weight: 600;
        font-size: 1rem;
        height: 40%;
        display: flex;
        justify-content: center;
        align-items: center;
    }`;
export const Gradient = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8));
  border-radius: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
`;
