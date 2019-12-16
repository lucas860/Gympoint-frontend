import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import { Container, Content, Menu } from './styles';

import logo from '~/assets/logo-menu.png';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.admin);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <img src={logo} alt="Gympoint" />

          <Menu>
            <li>
              <Link to="/students">alunos</Link>
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
          <strong>{user ? user.name : 'Admin'}</strong>
          <button type="button" onClick={handleLogout}>
            Sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
