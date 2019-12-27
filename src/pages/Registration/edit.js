import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format, addMonths } from 'date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify';

import formatPrice from '~/util/format';
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
import { BoxDatePicker, CardSelect } from './styles';

export default function RegistrationUpdate({ location }) {
  const registration = location.state.reg;

  const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(
    registration.student.id
  );
  const [selectedPlan, setSelectedPlan] = useState(registration.plan.id);
  const [defaultDate, setDefaultDate] = useState(
    parseISO(registration.start_date)
  );
  const [price, setPrice] = useState(registration.price);
  const [getPlan, setGetPlan] = useState(registration.plan);

  const totalPrice = useMemo(() => formatPrice(price), [price]);

  const endDt = useMemo(
    () => format(addMonths(defaultDate, getPlan.duration), 'dd/MM/yyyy'),
    [defaultDate, getPlan]
  );

  console.tron.log(registration);

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
      await api.put(`/registration/${registration.id}`, {
        student: Number(student),
        plan: Number(plan),
        date: defaultDate,
      });
      toast.success('Matrícula cadastrada com sucesso!');
    } catch (err) {
      toast.error(
        'Falha ao cadastrar matrícula! Verifique os dados informados.'
      );
    }
  }

  function changeDate(selectedDate) {
    setDefaultDate(selectedDate);
  }

  function changeStudent(value) {
    setSelectedStudent(value);
  }

  async function changePlan(value) {
    const p = await api.get(`/plan/${value}`);

    setSelectedPlan(value);
    setGetPlan(p.data);
    setPrice(p.data.duration * p.data.price);
  }

  return (
    <Container>
      <ContentHeader>
        <h1>Edição de matrícula</h1>
        <div>
          <BackButton to="/registrations">VOLTAR</BackButton>

          <SaveButton type="submit" form="registration">
            SALVAR
          </SaveButton>
        </div>
      </ContentHeader>

      <Card id="registration" onSubmit={handleSubmit}>
        <strong>NOME DO ALUNO</strong>
        <CardSelect
          name="student"
          value={selectedStudent}
          options={students}
          onChange={e => changeStudent(e.target.value)}
        />

        <Line>
          <div>
            <strong>PLANO</strong>
            <CardSelect
              name="plan"
              value={selectedPlan}
              options={plans}
              onChange={e => changePlan(e.target.value)}
            />
          </div>

          <BoxDatePicker>
            <strong>DATA DE INÍCIO</strong>
            <KeyboardDatePicker
              disableToolbar
              value={defaultDate}
              inputVariant="outlined"
              format="dd/MM/yyyy"
              onChange={changeDate}
            />
          </BoxDatePicker>

          <div>
            <strong>DATA DE TÉRMINO</strong>
            <CardInput name="endDate" value={endDt} disabled readOnly />
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

RegistrationUpdate.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      reg: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
