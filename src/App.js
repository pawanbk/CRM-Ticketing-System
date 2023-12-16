import './App.css';
import Forget from './component/Auth/Forget.js';
import Dashboard from './pages/Dashboard.js';
import Landing from './pages/Landing.js';
import {BrowserRouter as Router, Routes, Link, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} exact />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forget-password" element={<Forget />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
