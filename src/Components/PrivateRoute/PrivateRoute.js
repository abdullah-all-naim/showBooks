import React from 'react';
import { Redirect, Route, useLocation } from 'react-router-dom';

const PrivateRoute = (props) => {
    const location = useLocation()
    return (
      <Route
      path={props.path}
         render={data =>
          (localStorage.getItem('loggedIn'))? (
            <props.component {...data}></props.component>
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  export default PrivateRoute;