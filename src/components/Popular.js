import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Gradient, Wrapper } from "./StyledCom";

const Popular = () => {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    const check = localStorage.getItem("popular");
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=62760f30a3e14f458ce929a5caed60f0&number=9`
      )
        .then((res) => res.json())
        .then((data) => {
          setPopular(data.recipes);
          localStorage.setItem("popular", JSON.stringify(data.recipes));
        });
    }
  }, []);
  console.log("popular:", popular);
  return (
    <Wrapper>
      <h1>Popular Picks...</h1>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          pagination: false,
          gap: "1rem",
          drag: "free",
        }}
      >
        {popular.map((element) => {
          return (
            <SplideSlide key={element.id}>
              <Link to={"recipe/" + element.id}>
                <Card key={element.id}>
                  <img src={element.image} alt="" />
                  <p>{element.title}</p>
                  <Gradient />
                </Card>
              </Link>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

export default Popular;
