import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { ROUTE } from "../constant/route";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notFound";

export const routes = [
  {
    path: ROUTE.HOMEPAGE,
    element: HomePage,
    title: "Home",
    isPrivate: true,
  },
  {
    path: ROUTE.LOGIN,
    element: LoginPage,
    title: "Login",
  },
  {
    path: "*",
    title: "404",
    is404: true,
    element: NotFoundPage,
  },
].map((route) => {
  if (route.isPrivate) {
    return {
      ...route,
      element: (
        <PrivateRoute title={route.title}>
          <route.element />
        </PrivateRoute>
      ),
    };
  }
  return {
    ...route,
    element: (
      <PublicRoute title={route.title}>
        <route.element />
      </PublicRoute>
    ),
  };
});
