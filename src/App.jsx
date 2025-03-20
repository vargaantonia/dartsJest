import { BrowserRouter as Router, NavLink, Routes, Route } from "react-router-dom";
import { DartsListPage } from "./DartsListPage";
import { DartsSingle } from "./DartsSingle";
import { DartsCreate } from "./DartsCreate";
import { DartsDel } from "./DartsDel";
import { DartsMod } from "./DartsMod";
import "./App.css";

const App = () => {
  return (
    <Router>
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">Dartsozó</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/create-darts">Új dartsozó</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
      <Route path="/darts/:dartsId" element={<DartsSingle />} />
        <Route path="/" element={<DartsListPage />} />
        <Route path="/create-darts" element={<DartsCreate />} />
        <Route path="/del-darts/:dartsId" element={<DartsDel />} />
        <Route path="/mod-darts/:dartsId" element={<DartsMod />} />
      </Routes>
    </Router>
  );
};

export default App;
