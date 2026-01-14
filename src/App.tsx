import { Route, Router, Switch } from "wouter";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import RootLanding from "./pages/RootLanding";
import CreateSuccess from "./pages/CreateSuccess";
import { isRootDomain } from "./lib/subdomain";

function App() {
  const [isRoot, setIsRoot] = useState<boolean | null>(null);

  useEffect(() => {
    // Check if we're on the root domain
    if (typeof window !== 'undefined') {
      setIsRoot(isRootDomain(window.location.hostname));
    }
  }, []);

  // Show loading state while checking
  if (isRoot === null) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <Router base="/">
      <Switch>
        <Route path="/success">
          <CreateSuccess />
        </Route>
        {!isRoot && (
          <>
            <Route path="/privacy-policy">
              <Home />
            </Route>
            <Route path="/terms">
              <Home />
            </Route>
          </>
        )}
        <Route>
          {isRoot ? <RootLanding /> : <Home />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;