import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';
import formatPrice from '~/util/format';

import ContentHeader from '~/components/ContentHeader';

import {
  Container,
  ContainerBox,
  Card,
  CardInput,
  Line,
  BackButton,
  SaveButton,
} from '~/pages/_layouts/default/styles';

export default function PlanRegister() {
  const [dr, setDr] = useState(0);
  const [pr, setPr] = useState(0);

  const totalPrice = useMemo(() => formatPrice(dr * pr), [dr, pr]);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.post('/plans', { title, duration, price });

      toast.success('Plano cadastrado com sucesso');
      history.push('/plans');
    } catch (err) {
      toast.error('Falha ao cadastrar o plano');
    }
  }

  return (
    <Container>
      <ContainerBox>
        <ContentHeader>
          <h1>Cadastro de plano</h1>
          <div>
            <BackButton to="/plans">VOLTAR</BackButton>

            <SaveButton type="submit" form="plan">
              SALVAR
            </SaveButton>
          </div>
        </ContentHeader>

        <Card id="plan" onSubmit={handleSubmit}>
          <strong>TÍTULO DO PLANO</strong>
          <CardInput name="title" type="name" />

          <Line>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <CardInput
                name="duration"
                type="number"
                onChange={e => setDr(e.target.value)}
              />
            </div>

            <div>
              <strong>PREÇO MENSAL</strong>
              <CardInput
                name="price"
                step={0.1}
                type="number"
                onChange={e => setPr(e.target.value)}
              />
            </div>

            <div>
              <strong>PREÇO TOTAL</strong>
              <CardInput
                name="total"
                step={0.01}
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
