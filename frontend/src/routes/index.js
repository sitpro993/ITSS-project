import { useRoutes } from "react-router-dom";
import { ROLE } from "../constant/role";
import { routes } from "./config";

const AppRouter = function AppRouter() {
  const user = ROLE.STUDENT

  const filterRoutes = routes.filter((route) => {
    if (route.is404) {
      return true;
    }
    if (user) {
      if (route.role) {
        if (route.role.includes(user)) {
          return true;
        }
        return false;
      }
      return true;
    }

    return !route.isPrivate;
  });
  const appRoutes = useRoutes(filterRoutes);
  return appRoutes;
};

export default AppRouter;
