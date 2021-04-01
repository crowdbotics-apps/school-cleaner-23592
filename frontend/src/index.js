import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { ConnectedRouter } from 'connected-react-router';

import configureStore, { history } from './store';
import App from './main/App';
import 'bootstrap/dist/css/bootstrap.min.css';

const initialState = {};

const store = configureStore(initialState);

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div>
          <App />
        </div>
      </ConnectedRouter>
    </Provider>,
    document.getElementById('root'),
);
