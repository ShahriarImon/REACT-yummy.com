import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Grid } from "./Cuisine";
import { motion } from "framer-motion";

const SearchedItems = () => {
  const params = useParams();
  const [searchedItems, setSearchedItems] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=62760f30a3e14f458ce929a5caed60f0&query=${params.search}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data:", data.results);
        setSearchedItems(data.results);
      });
  }, [params.search]);
  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <Grid>
        {searchedItems.map((element) => {
          return (
            <Link
              to={"/recipe/" + element.id}
              style={{ textDecoration: "none" }}
            >
              <Card key={element.id}>
                <img src={element.image} alt="" />
                <h4>{element.title}</h4>
              </Card>
            </Link>
          );
        })}
      </Grid>
    </motion.div>
  );
};

export default SearchedItems;
