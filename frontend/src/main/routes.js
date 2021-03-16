import './App.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import LogIn from '../screens/LogIn';
import SignUp from '../screens/SignUp';
import ResetPassword from '../screens/ResetPassword';

export default function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={LogIn} />
    	<Route path='/signup' exact component={SignUp} />
    	<Route path='/reset-password' exact component={ResetPassword} />
    </Switch>
  );
}

