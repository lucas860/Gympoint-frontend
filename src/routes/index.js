import React from 'react';
import { Switch, Redirect } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

// Student pages
import StudentList from '~/pages/Students/index';
import StudentRegister from '~/pages/Students/create';
import StudentUpdate from '~/pages/Students/edit';

// Plan pages
import PlanList from '~/pages/plans/index';
import PlanRegister from '~/pages/plans/create';
import PlanUpdate from '~/pages/plans/edit';

// Registration pages
import RegistrationList from '~/pages/registration/index';
import RegistrationRegister from '~/pages/registration/create';
import RegistrationUpdate from '~/pages/registration/edit';

// Help pages
import HelpOrders from '~/pages/help/index';
import Answer from '~/pages/help/AnswerModal';

export default function Routes() {
  return (
    <Switch>
      <Route path="/login" component={SignIn} />

      <Route path="/students" exact component={StudentList} isPrivate />
      <Route
        path="/student/register"
        exact
        component={StudentRegister}
        isPrivate
      />
      <Route path="/student/edit" component={StudentUpdate} isPrivate />

      <Route path="/plans" component={PlanList} isPrivate />
      <Route path="/plan/register" exact component={PlanRegister} isPrivate />
      <Route path="/plan/edit" component={PlanUpdate} isPrivate />

      <Route path="/registrations" component={RegistrationList} isPrivate />
      <Route
        path="/registration"
        exact
        component={RegistrationRegister}
        isPrivate
      />
      <Route
        path="/registration/:registration_id"
        component={RegistrationUpdate}
        isPrivate
      />

      <Route path="/help" component={HelpOrders} isPrivate />
      <Route path="/help/answer" component={Answer} isPrivate />

      <Redirect from="/*" to="/students" />
    </Switch>
  );
}
