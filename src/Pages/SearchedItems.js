import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Grid } from "./Cuisine";

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
    <Grid>
      {searchedItems.map((element) => {
        return (
          <Link to={"/recipe/" + element.id} style={{ textDecoration: "none" }}>
            <Card key={element.id}>
              <img src={element.image} alt="" />
              <h4>{element.title}</h4>
            </Card>
          </Link>
        );
      })}
    </Grid>
  );
};

export default SearchedItems;
