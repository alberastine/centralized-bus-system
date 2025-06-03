import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Buses from './pages/Buses';
import Drivers from './pages/Drivers';
import Finance from './pages/Finance';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/drivers" element={<Drivers />} />
        <Route path="/buses" element={<Buses />} />
        <Route path="/finance" element={<Finance />} />
      </Routes>
    </Router>
  );
}

export default App;
