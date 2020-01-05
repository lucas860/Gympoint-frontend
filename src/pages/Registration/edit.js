import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { parseISO, format, addMonths } from 'date-fns';
import { KeyboardDatePicker } from '@material-ui/pickers';
import { toast } from 'react-toastify';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import formatPrice from '~/util/format';
import api from '~/services/api';

import ContentHeader from '~/components/ContentHeader';

import {
  Container,
  ContainerBox,
  BackButton,
  SaveButton,
  Card,
  CardInput,
  Line,
} from '~/pages/_layouts/default/styles';
import { BoxDatePicker } from './styles';

export default function RegistrationUpdate({ location }) {
  const registration = location.state.reg;
  const [search, setSearch] = useState('');

  // const [students, setStudents] = useState([]);
  const [plans, setPlans] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(registration.student);
  const [selectedPlan, setSelectedPlan] = useState(registration.plan);
  const [defaultDate, setDefaultDate] = useState(
    parseISO(registration.start_date)
  );
  const [price, setPrice] = useState(registration.price);
  const [getPlan, setGetPlan] = useState(registration.plan);

  const asyncStyle = {
    container: provided => ({
      ...provided,
      color: '#666',
      marginTop: 10,
      marginBottom: 20,
      ':last-child': {
        marginBottom: 0,
      },
    }),
    control: provided => ({
      ...provided,
      border: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      fontSize: 16,
      height: 45,
    }),
    option: provided => ({
      ...provided,
      fontSize: 16,
    }),
    singleValue: () => ({
      fontSize: 16,
    }),
  };

  const totalPrice = useMemo(() => formatPrice(price), [price]);

  const endDt = useMemo(
    () => format(addMonths(defaultDate, getPlan.duration), 'dd/MM/yyyy'),
    [defaultDate, getPlan]
  );

  useEffect(() => {
    async function loadOptions() {
      const response = await api.get('/plans');

      setPlans(response.data);
    }

    loadOptions();
  }, []);

  async function handleSubmit() {
    try {
      await api.put(`/registration/${registration.id}`, {
        student: Number(selectedStudent.id),
        plan: Number(selectedPlan.id),
        date: defaultDate,
      });
      toast.success('Matrícula cadastrada com sucesso!');
    } catch (err) {
      toast.error(
        'Falha ao cadastrar matrícula! Verifique os dados informados.'
      );
    }
  }

  async function loadStudentOptions() {
    const response = await api.get('/students/registrations', {
      params: { search },
    });

    return response.data;
  }

  async function changePlan(value) {
    const p = await api.get(`/plan/${value.id}`);

    setSelectedPlan(value);
    setGetPlan(p.data);
    setPrice(p.data.duration * p.data.price);
  }

  return (
    <Container>
      <ContainerBox>
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
          <AsyncSelect
            isClearable
            isSearchable
            name="students"
            styles={asyncStyle}
            placeholder="Buscar aluno"
            value={selectedStudent}
            defaultOptions
            loadOptions={loadStudentOptions}
            getOptionLabel={student => student.name}
            getOptionValue={student => student.id}
            onChange={value => setSelectedStudent(value)}
            onInputChange={value => setSearch(value)}
          />

          <Line>
            <div>
              <strong>PLANO</strong>
              <Select
                isSearchable={false}
                styles={asyncStyle}
                placeholder="Selecione o plano"
                value={selectedPlan}
                options={plans}
                getOptionValue={plan => plan.id}
                getOptionLabel={plan => plan.title}
                onChange={value => changePlan(value)}
              />
            </div>

            <BoxDatePicker>
              <strong>DATA DE INÍCIO</strong>
              <KeyboardDatePicker
                disableToolbar
                value={defaultDate}
                inputVariant="outlined"
                format="dd/MM/yyyy"
                onChange={date => setDefaultDate(date)}
              />
            </BoxDatePicker>

            <div>
              <strong>DATA DE TÉRMINO</strong>
              <CardInput name="endDate" value={endDt} disabled readOnly />
            </div>

            <div>
              <strong>VALOR FINAL</strong>
              <CardInput
                name="totalPrice"
                value={totalPrice}
                disabled
                readOnly
              />
            </div>
          </Line>
        </Card>
      </ContainerBox>
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
