import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
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

  function handleEditPlan({ id, title, duration, price }) {
    history.push('/plan/edit', { plan: { id, title, duration, price } });
  }

  async function confirmDelete(id) {
    const confirm = window.confirm('Deseja realmente deletar esse plano?');

    if (confirm) {
      await api.delete(`/plan/${id}`);

      toast.success('Usuário deletado com sucesso');
    }
  }

  return (
    <Container>
      <ContentHeader>
        <h1>Gerenciando Planos</h1>
        <div>
          <RegisterButton to="/plan/register" />
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
                <EditButton onClick={() => handleEditPlan(plan)}>
                  editar
                </EditButton>
                <DelButton type="button" onClick={() => confirmDelete(plan.id)}>
                  apagar
                </DelButton>
              </td>
            </TableLine>
          ))}
        </tbody>
      </TableList>
    </Container>
  );
}
