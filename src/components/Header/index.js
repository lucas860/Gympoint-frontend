import React from 'react';
import { Link } from 'react-router-dom';
import { getToken, logout } from '~/services/auth';
import history from '~/services/history';
import logo from '~/assets/logo-menu.png';

import { Container, Content, Menu } from './styles';

export default function Header() {
  function handleLogout() {
    logout();
    history.push('/login');
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />

          <Menu>
            <li>
              <Link to="/">alunos</Link>
            </li>
            <li>
              <Link to="/plans">planos</Link>
            </li>
            <li>
              <Link to="/registrations">matrículas</Link>
            </li>
            <li>
              <Link to="/help">pedidos de auxílio</Link>
            </li>
          </Menu>
        </nav>

        <aside>
          <strong>Lucas Fernandes</strong>
          <button type="button" onClick={handleLogout}>
            Sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
