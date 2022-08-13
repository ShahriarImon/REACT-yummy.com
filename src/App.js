import { BrowserRouter } from "react-router-dom";
import Category from "./components/Category";
import Search from "./components/Search";
import FirebaseAuth from "./Pages/FirebaseAuth";
import Pages from "./Pages/Pages";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Search />
        <Category />
        <Pages />
        <FirebaseAuth />
      </BrowserRouter>
    </div>
  );
}

export default App;
