import React, { useState, useEffect, useMemo } from 'react';
import { format, addMonths } from 'date-fns';
import { toast } from 'react-toastify';
import { KeyboardDatePicker } from '@material-ui/pickers';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

import api from '~/services/api';
import history from '~/services/history';
import formatPrice from '~/util/format';

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

export default function RegistrationRegister() {
  const [search, setSearch] = useState('');

  const [plans, setPlans] = useState([]);

  const [getStudent, setGetStudent] = useState();
  const [getPlan, setGetPlan] = useState();
  const [selectedDate, setSelectedDate] = useState(new Date());

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

  const totalPrice = useMemo(() => {
    if (getPlan) {
      const { price, duration } = plans.find(p => p.id === Number(getPlan));

      return formatPrice(price * duration);
    }

    return '';
  }, [plans, getPlan]);

  const endDate = useMemo(() => {
    if (getPlan) {
      const { duration } = plans.find(p => p.id === Number(getPlan));

      const data = format(addMonths(selectedDate, duration), 'dd/MM/yyyy');

      return data;
    }

    return '';
  }, [plans, getPlan, selectedDate]);

  useEffect(() => {
    async function loadOptions() {
      const response = await api.get('/plans');

      setPlans(response.data);
    }

    loadOptions();
  }, []);

  async function loadStudentOptions() {
    const response = await api.get('/students/registrations', {
      params: { search },
    });

    return response.data;
  }

  async function handleSubmit() {
    try {
      await api.post('/registration', {
        student: Number(getStudent),
        plan: Number(getPlan),
        date: selectedDate,
      });

      toast.success('Matrícula cadastrada com sucesso!');
      history.push('/registrations');
    } catch (err) {
      toast.error(
        'Falha ao cadastrar matrícula! Verifique os dados informados.'
      );
    }
  }

  return (
    <Container>
      <ContainerBox>
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
          <AsyncSelect
            isSearchable
            name="students"
            styles={asyncStyle}
            placeholder="Buscar aluno"
            defaultOptions
            loadOptions={loadStudentOptions}
            getOptionLabel={student => student.name}
            getOptionValue={student => student.id}
            onChange={value => setGetStudent(value.id)}
            onInputChange={value => setSearch(value)}
          />

          <Line>
            <div>
              <strong>PLANO</strong>
              <Select
                isSearchable={false}
                styles={asyncStyle}
                placeholder="Selecione o plano"
                options={plans}
                getOptionValue={plan => plan.id}
                getOptionLabel={plan => plan.title}
                onChange={value => setGetPlan(value.id)}
              />
            </div>

            <BoxDatePicker>
              <strong>DATA DE INÍCIO</strong>
              <KeyboardDatePicker
                disableToolbar
                inputVariant="outlined"
                format="dd/MM/yyyy"
                value={selectedDate}
                onChange={date => setSelectedDate(date)}
              />
            </BoxDatePicker>

            <div>
              <strong>DATA DE TÉRMINO</strong>
              <CardInput name="end_date" value={endDate} disabled readOnly />
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
