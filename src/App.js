import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./components/login/login";
import Register from "./components/register/register";
import NavBar from "./components/navbar/navbar";
import Dashboard from "./components/dashboard/dashboard";
import Blog from "./components/blog/blog";
import NewBlog from "./components/newBlog/newBlog";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/dashboard" exact component={Dashboard}></Route>
            <Route path="/blog" exact component={Blog}></Route>
            <Route path="/blog/add" exact component={NewBlog}></Route>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
