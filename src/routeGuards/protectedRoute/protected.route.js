import { React } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Auth from './../../classes/auth';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={
            (props) => {
                if (Auth.isLoggedIn()) {
                    return <Component {...props} />
                } else {
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    } />
                }
            }
        }></Route >
    )

}

export default ProtectedRoute;