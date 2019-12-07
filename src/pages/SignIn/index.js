import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

import { login } from '~/services/auth';

import logo from '~/assets/logo.png';

import { Container, Content } from './styles';

export default function SignIn() {
  async function handleSubmit({ email, password }) {
    try {
      const response = await api.post('/session', { email, password });

      const { token, user } = response.data;

      const profile = user.name;

      login(token, profile);

      history.push('/');
    } catch (err) {
      toast.error('Falha na autenticação, verifique seus dados!');
      console.tron.log(err);
    }
  }

  return (
    <Container>
      <Content>
        <img src={logo} alt="Gympoint" />

        <Form onSubmit={handleSubmit}>
          <label htmlFor="email">SEU E-MAIL</label>
          <Input name="email" type="email" placeholder="exemplo@email.com" />

          <label htmlFor="email">SUA SENHA</label>
          <Input name="password" type="password" placeholder="**********" />

          <button type="submit">Entrar no Gympoint</button>
        </Form>
      </Content>
    </Container>
  );
}
