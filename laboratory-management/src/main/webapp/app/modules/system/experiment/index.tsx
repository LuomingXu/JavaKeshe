import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import Experiment from 'app/modules/system/experiment/experiment';
import ExperimentDetail from 'app/modules/system/experiment/experiment-detail';

const Routes = ({ match }) => (
  <Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/detail`} component={ExperimentDetail} />
    <ErrorBoundaryRoute path={match.url} component={Experiment} />
  </Switch>
);

export default Routes;
