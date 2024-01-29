import "./App.css";
import Forget from "./component/auth/Forget.js";
import Reset from "./component/auth/ResetPassword.js";
import Dashboard from "./pages/Dashboard.js";
import Landing from "./pages/Landing.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./component/protected-route/PrivateRoute.js";
import TicketList from "./pages/TicketList.js";
import Profile from "./pages/Profile.js";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} exact />
          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>
          <Route path="/tickets" element={<PrivateRoute />}>
            <Route path="/tickets" element={<TicketList />} />
          </Route>
          <Route path="/profile" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/forget-password" element={<Forget />} />
          <Route path="/reset-password" element={<Reset />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
