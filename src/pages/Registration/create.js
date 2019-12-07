import React, { useState, useEffect, useMemo } from 'react';
import { parseISO, addMonth } from 'date-fns';
import { toast } from 'react-toastify';
import { KeyboardDatePicker } from '@material-ui/pickers';
import api from '~/services/api';
import formatPrice from '~/util/format';

import ContentHeader from '~/components/ContentHeader';

import {
  Container,
  BackButton,
  SaveButton,
  Card,
  CardInput,
  Line,
} from '~/pages/_layouts/default/styles';
import { CardSelect, BoxDatePicker } from './styles';

export default function RegistrationRegister() {
  const [getPlan, setGetPlan] = useState();
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date());

  const totalPrice = useMemo(() => {
    if (getPlan) {
      const { price, duration } = plans.find(p => p.id === Number(getPlan));

      return formatPrice(price * duration);
    }
    return formatPrice(0);
  }, [getPlan]);

  useEffect(() => {
    async function loadOptions() {
      const response = await Promise.all([
        api.get('/students'),
        api.get('/plans'),
      ]);

      const studs = response[0].data.map(s => ({
        id: s.id,
        title: s.name,
      }));

      setStudents(studs);
      setPlans(response[1].data);
    }

    loadOptions();
  }, []);

  async function handleSubmit({ student, plan }) {
    try {
      await api.post('/registration', {
        student: Number(student),
        plan: Number(plan),
        date: selectDate,
      });

      toast.success('Matrícula cadastrada com sucesso!');
    } catch (err) {
      toast.error(
        'Falha ao cadastrar matrícula! Verifique os dados informados.'
      );
    }
  }

  function changeDate(date) {
    setSelectDate(date);
  }

  return (
    <Container>
      <ContentHeader>
        <h1>Cadastro de matrícula</h1>
        <div>
          <BackButton to="/registrations">VOLTAR</BackButton>

          <SaveButton type="submit" form="registration">
            SALVAR
          </SaveButton>
        </div>
      </ContentHeader>

      <Card id="registration" onSubmit={handleSubmit}>
        <strong>NOME DO ALUNO</strong>
        <CardSelect name="student" options={students} />

        <Line>
          <div>
            <strong>PLANO</strong>
            <CardSelect
              name="plan"
              options={plans}
              onChange={e => setGetPlan(e.target.value)}
            />
          </div>

          <BoxDatePicker>
            <strong>DATA DE INÍCIO</strong>
            <KeyboardDatePicker
              disableToolbar
              inputVariant="outlined"
              format="dd/MM/yyyy"
              value={selectDate}
              onChange={changeDate}
            />
          </BoxDatePicker>

          <div>
            <strong>DATA DE TÉRMINO</strong>
            <CardInput name="end_date" disabled readOnly />
          </div>

          <div>
            <strong>VALOR FINAL</strong>
            <CardInput name="totalPrice" value={totalPrice} disabled readOnly />
          </div>
        </Line>
      </Card>
    </Container>
  );
}
