import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Title } from "./components/Title";
import { Home } from "./pages/Home";
import { Details } from "./pages/Details";

function App() {
  return (
    <div className="page">
      <Title />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/details/:name" element={<Details />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
