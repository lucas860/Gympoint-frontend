import React, { useState, useEffect } from 'react';

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

export default function RegistrationUpdate() {
  const [options, setOptions] = useState([]);

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

      <Card id="registration">
        <strong>NOME DO ALUNO</strong>
        <CardInput name="name" type="text" />

        <Line>
          <div>
            <strong>PLANO</strong>
            <CardSelect name="name" options={options} />
          </div>

          <div>
            <strong>DATA DE INÍCIO</strong>
            <CardInput name="name" type="date" />
          </div>

          <div>
            <strong>DATA DE TÉRMINO</strong>
            <CardInput name="name" type="text" disabled readOnly />
          </div>

          <div>
            <strong>VALOR FINAL</strong>
            <CardInput name="name" type="text" disabled readOnly />
          </div>
        </Line>
      </Card>
    </Container>
  );
}
