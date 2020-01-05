import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import active from '~/assets/active.svg';
import inactive from '~/assets/inactive.svg';

import ContentHeader from '~/components/ContentHeader';
import RegisterButton from '~/components/RegisterButton';

import { EditButton, DelButton } from '~/pages/_layouts/default/styles';
import { RegisterList, TableList } from './styles';

export default function RegistrationList() {
  const [regs, setRegs] = useState([]);

  useEffect(() => {
    async function loadRegs() {
      const response = await api.get('/registration');

      const data = response.data.map(d => ({
        ...d,
        startDate: format(parseISO(d.start_date), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
        endDate: format(parseISO(d.end_date), "d 'de' MMMM 'de' yyyy", {
          locale: pt,
        }),
      }));

      setRegs(data);
    }

    loadRegs();
  }, []);

  function handleEditRegistration({
    id,
    student,
    plan,
    price,
    start_date,
    end_date,
  }) {
    history.push('/registration/edit', {
      reg: { id, student, plan, price, start_date, end_date },
    });
  }

  async function confirmDelete(id) {
    const confirm = window.confirm('Deseja realmente deletar esse plano?');

    if (confirm) {
      await api.delete(`/registration/${id}`);

      const newList = regs.filter(r => r.id !== id);
      setRegs(newList);

      toast.success('Usuário deletado com sucesso');
    }
  }

  return (
    <RegisterList>
      <ContentHeader>
        <h1>Gerenciando Matrículas</h1>
        <div>
          <RegisterButton to="/registration" />
        </div>
      </ContentHeader>

      <TableList>
        <thead>
          <tr>
            <th>ALUNO</th>
            <th>PLANO</th>
            <th>INÍCIO</th>
            <th>TÉRMINO</th>
            <th>ATIVA</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {regs.map(reg => (
            <tr key={reg.id}>
              <td>{reg.student.name}</td>
              <td>{reg.plan.title}</td>
              <td>{reg.startDate}</td>
              <td>{reg.endDate}</td>
              <td>
                {reg.active ? (
                  <img src={active} alt="gympoint" />
                ) : (
                    <img src={inactive} alt="gympoint" />
                  )}
              </td>
              <td>
                <EditButton onClick={() => handleEditRegistration(reg)}>
                  editar
                </EditButton>

                <DelButton type="button" onClick={() => confirmDelete(reg.id)}>
                  apagar
                </DelButton>
              </td>
            </tr>
          ))}
        </tbody>
      </TableList>
    </RegisterList>
  );
}
