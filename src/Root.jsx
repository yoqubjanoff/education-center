import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Addinfo from "./components/Addinfo";
import SinglePage from "./components/SinglePage";
import Login from "./components/Login";
import { Context } from "./context/context";
import { useEffect, useState } from "react";

function Root() {
  const [eduData, seteduData] = useState([]);
  const [editData, setEditData] = useState(null);
  const [singleData, setSingleData] = useState(null);

  const navigate = useNavigate()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); 
    }
  }, []); 
  

  return (
    <>
      <Context.Provider
        value={{
          eduData,
          seteduData,
          setEditData,
          editData,
          setSingleData,
          singleData,
        }}
      >
        {window.location.pathname === "/login" ? "" : <Header />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/add-info" element={<Addinfo />} />
          <Route path="/singlepage/:id" element={<SinglePage />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Context.Provider> 
    </>
  );
}

export default Root;

// import React from "react";
// import { Route, Routes } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./components/Home";
// import Addinfo from "./components/Addinfo";
// import SinglePage from "./components/SinglePage";
// import Login from "./components/Login";
// import PrivateRoute from "./utils/PrivateRoute";
// import { Context } from "./context/context";
// import { useState } from "react";
// import Admin from "./components/Admin";

// function Root() {
//   const [eduData, seteduData] = useState([]);
//   const [editData, setEditData] = useState(null);

//   return (
//     <>
//       <Context.Provider value={{ eduData, seteduData, setEditData, editData }}>
//         <Routes>
//           <Route path="/" element={<Header />} />
//           <Route path="/login" element={<Login />} />
//           <Route element={<PrivateRoute />}>
//             <Route path="/" element={<Home />} />
//             <Route path="/admin" element={<Admin />} />
//             <Route path="/add-info" element={<Addinfo />} />
//             <Route path="/singlePage" element={<SinglePage />} />
//           </Route>
//         </Routes>
//       </Context.Provider>
//     </>
//   );
// }

// export default Root;
