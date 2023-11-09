import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Basket from "./pages/Basket";
import MyWallet from "./pages/MyWallet";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Auth />} />
      </Routes>
    </Fragment>
  );
}

export default App;
