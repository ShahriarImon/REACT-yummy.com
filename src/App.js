import { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Category from "./components/Category";
import Header from "./components/Header";
import Pages from "./Pages/Pages";

export const UserContext = createContext();
function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <BrowserRouter>
        <Header />
        <Category />
        <Pages />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
