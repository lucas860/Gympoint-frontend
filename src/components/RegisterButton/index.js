import React from 'react';
import PropTypes from 'prop-types';

import { Button } from './styles';

export default function RegisterButton({ to }) {
  return <Button to={to}>CADASTRAR</Button>;
}

RegisterButton.propTypes = {
  to: PropTypes.string,
};

RegisterButton.defaultProps = {
  to: null,
};
