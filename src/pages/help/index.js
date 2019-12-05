import React from 'react';

import ContentHeader from '~/components/ContentHeader';

import { HelpContainer, HelpList } from './styles';

export default function HelpOrders() {
  return (
    <HelpContainer>
      <ContentHeader>
        <h1>Pedidos de auxílio</h1>
      </ContentHeader>

      <HelpList>
        <thead>
          <th>Aluno</th>
        </thead>

        <tbody>
          <tr>
            <td>Lucas Fernandes Souza</td>
            <td>
              <button>responder</button>
            </td>
          </tr>
        </tbody>
      </HelpList>
    </HelpContainer>
  );
}
