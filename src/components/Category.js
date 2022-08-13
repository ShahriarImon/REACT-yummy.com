import React from "react";
import { GiNoodles, GiPizzaSlice } from "react-icons/gi";
import { SiBurgerking } from "react-icons/si";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Category = () => {
  return (
    <List>
      <ListItem to="/cuisine/american">
        <SiBurgerking className="icon" />
        <h4>American</h4>
      </ListItem>
      <ListItem to="/cuisine/italian">
        <GiPizzaSlice className="icon" />
        <h4>Italian</h4>
      </ListItem>

      <ListItem to="/cuisine/thai">
        <GiNoodles className="icon" />
        <h4>Thai</h4>
      </ListItem>
    </List>
  );
};

export default Category;

const List = styled.div`
  margin: 2rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ListItem = styled(NavLink)`
  background: rgba(0, 0, 0, 1);
  color: white;
  width: 4rem;
  height: 4rem;
  margin: 0rem 1rem;
  border-radius: 50rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .icon {
    font-size: 15pt;
  }
  h4 {
    font-size: 8pt;
  }
  &.active {
    background: linear-gradient(to right, green, red);
  }
`;
