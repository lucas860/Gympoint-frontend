import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { ToastContainer } from 'react-toastify';
import { Router } from 'react-router-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import './config/ReactotronConfig';
import history from '~/services/history';

import GlobalStyle from '~/styles/global';

import Routes from '~/routes';

export default function App() {
  return (
    <Router history={history}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Routes />
        <GlobalStyle />
        <ToastContainer autoClose={3000} />
      </MuiPickersUtilsProvider>
    </Router>
  );
}
