import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import User from "./pages/User/User";
import Error from "./pages/Error/Error";

function App() {

  const token = useSelector((state) => state.auth.token);

  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/user" element={token ? <User /> : <Navigate to="/sign-in" />} />
        <Route path="*" element={<Error />} />
      </Routes>
  );
}

export default App;
