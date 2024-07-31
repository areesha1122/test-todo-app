import { useLayoutEffect } from "react";
import { useLocation, useRoutes } from "react-router-dom";
import { routes } from "./routes";

const Wrapper = ({ children }) => {
  const location = useLocation();
  // Use useLayoutEffect to scroll to the top of the page when the location changes
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  const pages = useRoutes(routes);
  return (
    // Use the Wrapper component to ensure scrolling to the top on route changes
    <Wrapper>{pages}</Wrapper>
  );
}

export default App;
