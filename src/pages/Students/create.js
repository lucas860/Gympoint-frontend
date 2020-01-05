import React from 'react';
import { toast } from 'react-toastify';
import api from '~/services/api';
import history from '~/services/history';

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

export default function StudentRegister() {
  async function handleSubmit({ name, email, idade, peso, altura }) {
    try {
      const response = await api.post('/students', {
        name,
        email,
        idade,
        peso,
        altura,
      });

      if (response) {
        toast.success('Aluno cadastrado com sucesso!');
        history.push('/students');
      }
    } catch (err) {
      toast.error('Falha no cadastro. Verifique os dados informados!');
    }
  }

  return (
    <Container>
      <ContainerBox>
        <ContentHeader>
          <h1>Cadastro de aluno</h1>
          <div>
            <BackButton to="/students">VOLTAR</BackButton>

            <SaveButton form="student" type="submit">
              SALVAR
            </SaveButton>
          </div>
        </ContentHeader>

        <Card id="student" onSubmit={handleSubmit}>
          <strong>NOME COMPLETO</strong>
          <CardInput name="name" type="name" />

          <strong>ENDEREÇO DE EMAIL</strong>
          <CardInput name="email" type="email" />

          <Line>
            <div>
              <strong>IDADE</strong>
              <CardInput name="idade" type="number" />
            </div>
            <div>
              <strong>PESO (em kg)</strong>
              <CardInput
                name="peso"
                step={0.1}
                type="number"
                placeholder="00,0kg"
              />
            </div>
            <div>
              <strong>ALTURA</strong>
              <CardInput
                name="altura"
                step={0.01}
                type="number"
                placeholder="0,00m"
              />
            </div>
          </Line>
        </Card>
      </ContainerBox>
    </Container>
  );
}
