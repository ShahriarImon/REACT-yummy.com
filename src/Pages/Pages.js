import { AnimatePresence } from "framer-motion";
import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Cuisine from "./Cuisine";
import FirebaseAuth from "./FirebaseAuth";
import Home from "./Home";
import Recipe from "./Recipe";
import SearchedItems from "./SearchedItems";

const Pages = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes Location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/cuisine/:type" element={<Cuisine />} />
        <Route path="/searched/:search" element={<SearchedItems />} />
        <Route
          path="/recipe/:name"
          element={
            <PrivateRoute>
              <Recipe />
            </PrivateRoute>
          }
        />
        <Route path="/account" element={<FirebaseAuth />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
