import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Login from "./components/login/login";
import Register from "./components/register/register";
import NavBar from "./components/navbar/navbar";
import Dashboard from "./components/dashboard/dashboard";
import Blog from "./components/blog/blog";
import NewBlog from "./components/newBlog/newBlog";
import ProtectedRoute from './routeGuards/protectedRoute/protected.route';
import NotProtected from './routeGuards/protectedRoute/notprotected.route';
import Profile from "./components/profile/profile";

function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Container>
          <Switch>
            <NotProtected path="/" exact component={Login}></NotProtected>
            <NotProtected path="/login" exact component={Login}></NotProtected>
            <NotProtected path="/register" exact component={Register}></NotProtected>
            <ProtectedRoute path="/dashboard" exact component={Dashboard}></ProtectedRoute>
            <ProtectedRoute path="/profile" exact component={Profile}></ProtectedRoute>
            <ProtectedRoute path="/blog" exact component={Blog}></ProtectedRoute>
            <ProtectedRoute path="/blog/add" exact component={NewBlog}></ProtectedRoute>
            <ProtectedRoute path="/blog/add/:id" exact component={NewBlog}></ProtectedRoute>
          </Switch>
        </Container>
      </div>
    </Router>
  );
}

export default App;
