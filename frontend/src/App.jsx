import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/authentication/login" element={<Login />} />
        <Route path="/authentication/register" element={<Register />} />
        <Route path="/authentication/forgot-password" element={<ForgotPassword />} />
        <Route path="/authentication/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;