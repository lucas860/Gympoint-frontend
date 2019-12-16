import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

import './config/ReactotronConfig';

import Routes from '~/routes';
import history from '~/services/history';

import { store, persistor } from '~/store';

import GlobalStyle from '~/styles/global';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Routes />
            <GlobalStyle />
            <ToastContainer autoClose={3000} />
          </MuiPickersUtilsProvider>
        </Router>
      </PersistGate>
    </Provider>
  );
}
