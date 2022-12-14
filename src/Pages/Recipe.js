import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Recipe = () => {
  let params = useParams();
  const [recipe, setRecipe] = useState({});
  const [activeTab, setActiveTab] = useState("Instructions");
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=62760f30a3e14f458ce929a5caed60f0`
    )
      .then((res) => res.json())
      .then((data) => setRecipe(data));
  }, [params.name]);
  console.log(recipe);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <DetailWrapper>
        <div className="left">
          <h2>{recipe.title}</h2>
          <img src={recipe.image} alt="" />
        </div>
        <Info className="right">
          <Button
            className={activeTab === "Instructions" ? "active" : ""}
            onClick={() => {
              setActiveTab("Instructions");
            }}
          >
            Instructions
          </Button>
          <Button
            className={activeTab === "Ingredients" ? "active" : ""}
            onClick={() => {
              setActiveTab("Ingredients");
            }}
          >
            Ingredients
          </Button>
          {activeTab === "Instructions" && (
            <div>
              <h4 dangerouslySetInnerHTML={{ __html: recipe.summary }}></h4>
              <h4
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              ></h4>
            </div>
          )}
          {activeTab === "Ingredients" && (
            <ul>
              {recipe.extendedIngredients.map((element) => (
                <li key={element.id}>{element.original}</li>
              ))}
            </ul>
          )}
        </Info>
      </DetailWrapper>
    </motion.div>
  );
};

export default Recipe;

const DetailWrapper = styled.div`
  margin-top: 4rem;
  margin-bottom: 5rem;
  display: flex;
  .left {
    width: 60%;
  }
  .left img {
    width: 80%;
  }
  .right {
    width: 40%;
  }
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  .show {
  }
  h2 {
    margin-bottom: 2rem;
  }

  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
`;
const Button = styled.button`
  padding: 2% 6%;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 1%;
  font-weight: 500;
`;
const Info = styled.div`
  margin-left: 1rem;
  h4 {
    font-size: 1.2rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
`;
