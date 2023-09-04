import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from "./pages/SignUp";
import SignIn from "./pages/Signin";
import Pagenotfound from "./pages/Pagenotfound";
import PrivateRoute from "./privateRouting/PrivateRoute";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { isUserLoggedIn } from "./redux/actions/authActions";
import Dashboard from "./pages/Dashboard";
import Charts from "./pages/Charts";


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      dispatch(isUserLoggedIn());
    }
  }, [dispatch, auth.isAuthenticated]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />

          <Route
            path="/"
            element={<PrivateRoute element={<Dashboard />} />}
          />
          <Route
            
            path="/charts"
            element={<PrivateRoute element={<Charts />} />}
          />
          <Route path="*" element={<Pagenotfound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
