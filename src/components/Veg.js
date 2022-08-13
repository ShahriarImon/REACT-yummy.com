import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Gradient, Wrapper } from "./StyledCom";

const Veg = () => {
  const [veg, setVeg] = useState([]);

  useEffect(() => {
    const check = localStorage.getItem("veg");
    if (check) {
      setVeg(JSON.parse(check));
    } else {
      fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=a316987482ba439c9d645dd2fd388d59&number=9&tags=vegetarian`
      )
        .then((res) => res.json())
        .then((data) => {
          setVeg(data.recipes);
          localStorage.setItem("veg", JSON.stringify(data.recipes));
        });
    }
  }, []);
  console.log("veg:", veg);
  return (
    <Wrapper>
      <h1>Vegetarian Picks...</h1>
      <Splide
        options={{
          perPage: 3,
          arrows: false,
          pagination: false,
          gap: "1rem",
          drag: "free",
        }}
      >
        {veg.map((element) => {
          return (
            <SplideSlide key={element.id}>
              <Card key={element.id}>
                <Link to={"/recipe/" + element.id}>
                  <img src={element.image} alt="" />
                  <p>{element.title}</p>
                  <Gradient />
                </Link>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
};

export default Veg;
