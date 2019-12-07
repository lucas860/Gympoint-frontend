import React, { useState, useEffect } from 'react';
import { KeyboardDatePicker } from '@material-ui/pickers';

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

export default function RegistrationUpdate() {
  const [options, setOptions] = useState([]);
  const [selectDate, setSelectDate] = useState();

  function handleSubmit() {}

  function changeDate(date) {
    setSelectDate(date);
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
        <CardSelect name="student" options={options} />

        <Line>
          <div>
            <strong>PLANO</strong>
            <CardSelect name="plan" options={options} />
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
            <CardInput name="totalPrice" disabled readOnly />
          </div>
        </Line>
      </Card>
    </Container>
  );
}
