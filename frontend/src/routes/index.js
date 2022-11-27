import { useRoutes } from "react-router-dom";
import { routes } from "./config";

const AppRouter = function AppRouter() {
  const appRoutes = useRoutes(routes);
  return appRoutes;
};

export default AppRouter;
