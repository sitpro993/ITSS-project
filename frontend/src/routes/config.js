import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";
import { ROUTE } from "../constant/route";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import NotFoundPage from "../pages/notFound";
import RegisterPage from "../pages/register";
import ApplyInternshipPage from "../pages/applyInternship";
import ProfilePage from "../pages/profile";
import { CompanyPage } from "../pages/company";
import { CompanyDetailsPage } from "../pages/companyDetails";
import { RequestsListPage } from "../pages/requests";

export const routes = [
  // route chung
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
    path: ROUTE.PROFILE,
    title: "Profile",
    element: ProfilePage,
    isPrivate: true,
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

  // route student
  {
    path: ROUTE.COMPANY,
    element: CompanyPage,
    title: "Company",
    isPrivate: true,
  },
  {
    path: ROUTE.COMPANY_DETAIL,
    element: CompanyDetailsPage,
    title: "Detail Company",
    isPrivate: true,
  },
  {
    path: ROUTE.APPLY_INTERNSHIP,
    element: ApplyInternshipPage,
    title: "Apply Internship",
    isPrivate: true,
  },
  // route company
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
