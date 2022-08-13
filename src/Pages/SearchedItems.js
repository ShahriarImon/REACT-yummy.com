import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Grid } from "./Cuisine";

const SearchedItems = () => {
  const params = useParams();
  const [searchedItems, setSearchedItems] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=a316987482ba439c9d645dd2fd388d59&query=${params.search}`
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
          <Link to={"/recipe/" + element.id}>
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
