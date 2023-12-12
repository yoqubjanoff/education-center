import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { IS_USER_LOGIN } from './constants';

const PrivateRoute = () => {
  return localStorage.getItem(IS_USER_LOGIN) ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
}

export default PrivateRoute
