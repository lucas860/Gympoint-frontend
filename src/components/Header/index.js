import React from 'react';
import { Link } from 'react-router-dom';

import { Container, Content, Menu } from './styles';

export default function Header() {
  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src="" alt="" />
          </Link>
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
          <button type="submit">Sair do sistema</button>
        </aside>
      </Content>
    </Container>
  );
}
