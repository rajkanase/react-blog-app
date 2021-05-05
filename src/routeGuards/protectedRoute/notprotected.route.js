import { React } from 'react';
import { Redirect, Route } from "react-router-dom";
import auth from "./../../classes/auth";

const NotProtected = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (!auth.isLoggedIn()) {
                    return < Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/dashboard",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        }></Route>
    )
}

export default NotProtected;