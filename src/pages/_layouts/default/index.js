import React from 'react';

import Header from '~/components/Header';
// import { Container } from './styles';

export default function DefaultLayout({ children }) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
