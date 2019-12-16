import React from 'react';
import PropTypes from 'prop-types';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import { store } from '~/store';
import { signOut } from '~/store/modules/auth/actions';

import DefaultLayout from '~/pages/_layouts/default';

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const dispatch = useDispatch();
  const { signed } = store.getState().auth;

  if (!signed && isPrivate) {
    return <Redirect to="/login" />;
  }

  if (signed && !isPrivate) {
    return <Redirect to="/students" />;
  }

  if (signed) {
    const { token } = store.getState().auth;

    if (jwtDecode(token).exp * 1000 < Date.now()) {
      toast.error('Sessão expirada!');
      dispatch(signOut());
    }

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
