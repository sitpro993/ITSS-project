import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { ROUTE } from "../constant/route";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notFound";
import RegisterPage from "../pages/register";
import { RequestsListPage } from "../pages/requests/list";
import { CompanysListPage, CompanyDetailsPage } from "../pages/companys";

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
    path: ROUTE.REGISTER,
    element: RegisterPage,
    title: "Register",
  },
  {
    path: ROUTE.COMPANYS,
    element: CompanysListPage,
    title: "List Companys",
  },
  {
    path: `${ROUTE.COMPANYS}/:id`,
    element: CompanyDetailsPage,
    title: "Detail Company",
  },
  {
    path: ROUTE.REQUESTS,
    element: RequestsListPage,
    title: "List Requests",
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
