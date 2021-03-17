// import './App.scss';
// import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Routes from './routes'

// export default function App() {
//   return (
//     <BrowserRouter>
//       <Routes/>
//     </BrowserRouter>
//   );
// }


import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';

import './App.scss';
import routes from './routes';
import { isLoggedIn } from '../utils/utility';
// import { getUserData } from '../modules/actions/UserActions';

const renderRoutes = () => {
  const renderRoute = (routerProps, Component, props, isPrivate = false) => {
    if (Component) {
      const componentProps = {
        ...routerProps,
        ...props,
      };
      if (isPrivate) {
        return isLoggedIn() ? (
          <Component {...componentProps} />
        ) : (
          <Redirect to="/login" />
        );
      }
      return isLoggedIn() ? (
        <Redirect to="/dashboard" />
      ) : (
        <Component {...componentProps} />
      ); // eslint-disable-line
    }
    return null;
  };

  return routes.map((route) => (
    <Route
      key={route.name}
      exact={route.exact}
      path={route.path}
      render={(routerProps) =>
        renderRoute(routerProps, route.component, route.props, route.isPrivate)
      }
    />
  ));
};

const Router = () => <Switch>{renderRoutes()}</Switch>;


const App = () => {
  
  return (
    <div>
      <Router />
    </div>
  );
};

export default withRouter(App);

