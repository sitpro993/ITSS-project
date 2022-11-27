import { useEffect } from "react";

const PublicRoute = function PublicRoute(props) {
  useEffect(() => {
    // set title
    document.title = props.title;
  }, [props.title]);
  return props.children;
};

export default PublicRoute;
