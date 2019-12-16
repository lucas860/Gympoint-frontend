import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Gympoint" />

        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <label htmlFor="password">SUA SENHA</label>
          <Input name="password" type="password" placeholder="**********" />

          <button type="submit">
            {loading ? 'Carregando...' : 'Entrar no Gympoint'}
          </button>
        </Form>
      </Content>
    </Container>
  );
}
