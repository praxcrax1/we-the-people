import "./App.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Landing from "./components/Landing";
import Home from "./components/Home";
import CreateProject from "./components/Project/Create";
import Back from "./components/Project/Back";
import Profile from "./components/Profile";
import { useEffect, useState } from "react";
import ErrorPage from "./components/Error";



function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null for initial state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('x-auth-token');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false); // Token check is done
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optionally, you can show a loading spinner
  }

  if (isAuthenticated === false) {
    return <Navigate to="/404" />;
  }

  return children;
}



function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/dashboard" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                    <Route path="/create-project" element={<ProtectedRoute><CreateProject /></ProtectedRoute>} />
                    <Route path="/project/:id" element={<ProtectedRoute><Back /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/edit-project/:id" element={<ProtectedRoute><CreateProject /></ProtectedRoute>}/>
                    <Route path="404" element={<ErrorPage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
