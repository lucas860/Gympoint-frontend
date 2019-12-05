import React from 'react';
import PropTypes from 'prop-types';

import { Header } from './styles';

export default function ContentHeader({ children }) {
  return <Header>{children}</Header>;
}

ContentHeader.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
