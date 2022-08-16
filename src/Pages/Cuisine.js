import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);

  let params = useParams();
  console.log(params);
  useEffect(() => {
    let check;
    if (params.type == "american") {
      check = localStorage.getItem("american");
    } else if (params.type == "italian") {
      check = localStorage.getItem("italian");
    } else if (params.type == "thai") {
      check = localStorage.getItem("thai");
    }

    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=62760f30a3e14f458ce929a5caed60f0&cuisine=${params.type}`
      )
        .then((res) => res.json())
        .then((data) => {
          setCuisine(data.results);
          if (params.type == "american") {
            localStorage.setItem("american", JSON.stringify(data.results));
          }
          if (params.type == "italian") {
            localStorage.setItem("italian", JSON.stringify(data.results));
          }

          if (params.type == "thai") {
            localStorage.setItem("thai", JSON.stringify(data.results));
          }
        });
    }
  }, [params.type]);

  let char = params.type.charAt(0).toUpperCase();
  let slice = params.type.slice(1);
  let foodType = char + slice;

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1
        style={{ textAlign: "center", marginBottom: "1rem", color: "#8c1c04" }}
      >{`Our ${foodType} Dishes... `}</h1>
      <Grid>
        {cuisine.map((element) => {
          return (
            <Card key={element.id}>
              <Link
                to={"/recipe/" + element.id}
                style={{ textDecoration: "none" }}
              >
                <img src={element.image} alt="" />
                <h4>{element.title}</h4>
              </Link>
            </Card>
          );
        })}
      </Grid>
    </motion.div>
  );
};

export default Cuisine;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 1rem;
`;
export const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
    color: black;
    font-size: 15pt;
  }
`;
