import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

import { RoutePath } from "./RoutePath";
import { PrivateLayout } from "../components";
import { getAuthToken } from "../config";
import { LoginPage, RegisterPage } from "../pages";
import { PrivateRoutes } from "./PrivateRoutes";
import { initAuthAction } from "../redux/auth/actions";
import { authSelector } from "../redux/auth/selector";

export const RootRouter = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector(authSelector);

  useEffect(() => {
    if (getAuthToken()) {
      // dispatch(fetchAuthUserAction());
    } else {
      dispatch(initAuthAction());
    }
  }, [dispatch]);

  return (
    <Routes>
      <Route path="/*" element={<Navigate replace to={isLoggedIn ? RoutePath.dashboard : RoutePath.login} />} />
      <Route path={RoutePath.login} element={<LoginPage />} />
      <Route path={RoutePath.register} element={<RegisterPage />} />
      {!!isLoggedIn && (
        <Route element={<PrivateLayout />}>
          {PrivateRoutes.map((one, index) => (
            <Route key={index} path={one.route} element={one.component} />
          ))}
        </Route>
      )}
    </Routes>
  );
};
