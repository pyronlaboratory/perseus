import Dashboard from "./containers/Dashboard/Dashboard";
import "./App.css";

import {
  BrowserRouter as Router
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Dashboard />
    </Router>
  );
}

export default App;
