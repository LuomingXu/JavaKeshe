import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import teacher from 'app/modules/system/teacher/teacer';
import TeacherDetail from 'app/modules/system/teacher/teacher-detail';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/detail`} component={TeacherDetail} />
    <ErrorBoundaryRoute path={match.url} component={teacher} />
  </Switch>
);

export default Routes;
