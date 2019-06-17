import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import teacher from "app/modules/system/teacher/teacer";

const Routes = ({match}) => (
    <Switch>
        {/*<ErrorBoundaryRoute exact path={`${match.url}/detail`} component={StudentDetail}/>*/}
        {/*<ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentDetail}/>*/}
        <ErrorBoundaryRoute path={match.url} component={teacher}/>
    </Switch>
);

export default Routes;
