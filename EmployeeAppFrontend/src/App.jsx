import React from "react";
import Login from "./components/Login";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Main from "./components/Main";
import PrivateRoutes from "./components/PrivateRoutes";
import EmployeeList from "./components/EmployeeList";
import AddEmployee from "./components/AddEmployee"

const App = () => {
  return (
    <div>
      {/* <Home/> */}
      {/* <Login/> */}

      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        {/* component is passesd as a prop */}
        {/* here the home is passed as aprop to main and the props name is child */}

        <Route element={<PrivateRoutes />}>
          <Route path="/employees" element={<Main child={<EmployeeList />} />}></Route>
          <Route
            path="/addemployees"
            element={<Main child={<AddEmployee />} />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
