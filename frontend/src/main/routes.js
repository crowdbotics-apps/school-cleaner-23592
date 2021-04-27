import Login from '../screens/LogIn';
import Signup from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';
import Dashboard from '../screens/Dashboard';
import Overview from "../screens/Dashboard/OverviewScreens/Overview"

export default [
  {
    exact: true,
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    exact: true,
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    exact: true,
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    exact: true,
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPassword,
  },
  {
    exact: true,
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    isPrivate: true,
  },
  {
    exact: true,
    path: '/overview',
    name: "Overview",
    component: Overview,
    isPrivate: true,
  },
];