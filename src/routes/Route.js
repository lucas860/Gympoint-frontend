import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import { isAuthenticated, getToken, logout } from '~/services/auth';

import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signed = isAuthenticated();
  const token = getToken();

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/" />;
  }

  if (signed && jwtDecode(token.auth).exp * 1000 < Date.now()) {
    toast.error('Sessão expirada!');
    logout();
    return <Redirect to="/login" />;
  }

  if (signed) {
    return (
      <Route
        {...rest}
        render={props => (
          <DefaultLayout>
            <Component {...props} />
          </DefaultLayout>
        )}
      />
    );
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
}

RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.func, PropTypes.element])
    .isRequired,
  isPrivate: PropTypes.bool,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
