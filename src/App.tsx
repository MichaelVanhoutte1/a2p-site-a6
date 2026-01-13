import { Route, Router, Switch } from "wouter";
import Home from "./pages/Home";

function App() {
  return (
    <Router base="/">
      <Switch>
        <Route path="/" component={Home} />
        <Route>Sorry, this page doesn't exist.</Route>
      </Switch>
    </Router>
  );
}

export default App;