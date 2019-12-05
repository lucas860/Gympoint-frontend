import React, { useState, useEffect } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import api from '~/services/api';
import formatPrice from '~/util/format';

import ContentHeader from '~/components/ContentHeader';
import RegisterButton from '~/components/RegisterButton';

import {
  Container,
  EditButton,
  DelButton,
} from '~/pages/_layouts/default/styles';
import { TableList, TableLine } from './styles';

export default function PlanList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPLans() {
      const response = await api.get('/plans');

      const data = response.data.map(p => ({
        ...p,
        priceFormatted: formatPrice(p.price),
      }));

      setPlans(data);
    }

    loadPLans();
  }, []);

  function handle() {}

  return (
    <Container>
      <ContentHeader>
        <h1>Gerenciando Planos</h1>
        <div>
          <RegisterButton to="/plan" />
        </div>
      </ContentHeader>

      <TableList>
        <thead>
          <TableLine>
            <th>TÍTULO</th>
            <th>DURAÇÃO</th>
            <th>VALOR p/ MÊS</th>
            <th> </th>
          </TableLine>
        </thead>

        <tbody>
          {plans.map(plan => (
            <TableLine key={plan.id}>
              <td>{plan.title}</td>
              <td>
                {plan.duration > 1
                  ? `${plan.duration} Meses`
                  : `${plan.duration} Mês`}
              </td>
              <td>{plan.priceFormatted}</td>
              <td>
                <EditButton to={`/plan/${plan.id}`}>
                  <MdEdit size={30} />
                </EditButton>
                <DelButton
                  type="button"
                  onClick={() => {
                    if (
                      window.confirm('Deseja realmente deletar esse plano?')
                    ) {
                      handle();
                    }
                  }}
                >
                  <MdDelete size={30} />
                </DelButton>
              </td>
            </TableLine>
          ))}
        </tbody>
      </TableList>
    </Container>
  );
}
