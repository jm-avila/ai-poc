import { BrowserRouter } from "react-router-dom";
import { AppLayout } from "./components";
import Pages from "./pages";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Pages />
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;
