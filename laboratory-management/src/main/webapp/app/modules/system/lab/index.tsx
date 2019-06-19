import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import LaboratoryDetail from 'app/modules/system/lab/laboratory-detail';
import Laboratory from 'app/modules/system/lab/laboratory';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/detail`} component={LaboratoryDetail} />
    <ErrorBoundaryRoute path={match.url} component={Laboratory} />
  </Switch>
);

export default Routes;
