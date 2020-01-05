import React, { useState, useMemo } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import api from '~/services/api';
import formatPrice from '~/util/format';

import ContentHeander from '~/components/ContentHeader';

import {
  Container,
  ContainerBox,
  Card,
  CardInput,
  BackButton,
  SaveButton,
  Line,
} from '~/pages/_layouts/default/styles';

export default function PlanUpdate({ location }) {
  // const [plan, setPlan] = useState(props.location.state.plan);
  const { plan } = location.state;
  const [dr, setDr] = useState(location.state.plan.duration);
  const [pr, setPr] = useState(location.state.plan.price);

  const totalPrice = useMemo(() => formatPrice(dr * pr), [dr, pr]);

  console.tron.log(plan);

  async function handleSubmit({ title, duration, price }) {
    try {
      await api.put(`/plans/${plan.id}`, {
        title,
        duration,
        price,
      });

      toast.success('O Plano foi atualizado com sucesso!');
    } catch (err) {
      toast.error('Falha ao atualizar os dados do plano!');
    }
  }

  return (
    <Container>
      <ContainerBox>
        <ContentHeander>
          <h1>Edição de plano</h1>
          <div>
            <BackButton to="/plans">VOLTAR</BackButton>

            <SaveButton submit type="submit" form="plan">
              SALVAR
            </SaveButton>
          </div>
        </ContentHeander>

        <Card id="plan" initialData={plan} onSubmit={handleSubmit}>
          <strong>TÍTULO DO PLANO</strong>
          <CardInput id="title" name="title" type="name" />

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
                value={totalPrice}
                step={0.01}
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

PlanUpdate.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      plan: PropTypes.object.isRequired,
    }).isRequired,
  }).isRequired,
};
