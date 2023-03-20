import { BrowserRouter } from "react-router-dom";
import Pages from "./pages";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Pages />
      </div>
    </BrowserRouter>
  );
}

export default App;
