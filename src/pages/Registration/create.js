import React, { useState, useEffect } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify';
import api from '~/services/api';

import ContentHeader from '~/components/ContentHeader';

import {
  Container,
  BackButton,
  SaveButton,
  Card,
  CardInput,
  Line,
} from '~/pages/_layouts/default/styles';
import { CardSelect } from './styles';

export default function RegistrationRegister() {
  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectDate, setSelectDate] = useState(new Date());

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
      console.tron.log(Number(student), Number(plan), selectDate);

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

        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="dd/MM/yyyy"
          value={selectDate}
          name="start_date"
          onChange={changeDate}
        />
        <Line>
          <div>
            <strong>PLANO</strong>
            <CardSelect name="plan" options={plans} />
          </div>

          <div>
            <strong>DATA DE INÍCIO</strong>
          </div>

          <div>
            <strong>DATA DE TÉRMINO</strong>
            <CardInput name="end_date" disabled readOnly />
          </div>

          <div>
            <strong>VALOR FINAL</strong>
            <CardInput name="totalPrice" disabled readOnly />
          </div>
        </Line>
      </Card>
    </Container>
  );
}
