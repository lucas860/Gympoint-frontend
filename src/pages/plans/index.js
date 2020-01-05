import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import formatPrice from '~/util/format';

import ContentHeader from '~/components/ContentHeader';
import RegisterButton from '~/components/RegisterButton';

import {
  Container,
  ContainerBox,
  EditButton,
  DelButton,
} from '~/pages/_layouts/default/styles';
import { TableList } from './styles';

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

      const newList = plans.filter(p => p.id !== id);
      setPlans(newList);

      toast.success('Usuário deletado com sucesso');
    }
  }

  return (
    <Container>
      <ContainerBox>
        <ContentHeader>
          <h1>Gerenciando Planos</h1>
          <div>
            <RegisterButton to="/plan/register" />
          </div>
        </ContentHeader>

        <TableList>
          <thead>
            <tr>
              <th>TÍTULO</th>
              <th>DURAÇÃO</th>
              <th>VALOR p/ MÊS</th>
              <th> </th>
            </tr>
          </thead>

          <tbody>
            {plans.map(plan => (
              <tr key={plan.id}>
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
                  <DelButton
                    type="button"
                    onClick={() => confirmDelete(plan.id)}
                  >
                    apagar
                  </DelButton>
                </td>
              </tr>
            ))}
          </tbody>
        </TableList>
      </ContainerBox>
    </Container>
  );
}
