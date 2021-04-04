import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./components/login/login";
import Register from "./components/register/register";
import NavBar from "./components/navbar/navbar";
import Dashboard from "./components/dashboard/dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container>
          <Switch>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
