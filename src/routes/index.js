import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';
import RegisterStudent from '~/pages/RegisterStudent';
import Plan from '~/pages/Plan';
import RegisterPlan from '~/pages/RegisterPlan';
import Registration from '~/pages/Registration';
import HelpRequest from '~/pages/HelpRequest';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />

      <Route path="/" exact component={Dashboard} isPrivate />
      <Route path="/register-student" component={RegisterStudent} isPrivate />

      <Route path="/plans" component={Plan} isPrivate />
      <Route path="/register-plan" component={RegisterPlan} isPrivate />

      <Route path="/registrations" component={Registration} isPrivate />

      <Route path="/help" component={HelpRequest} isPrivate />
    </Switch>
  );
}
