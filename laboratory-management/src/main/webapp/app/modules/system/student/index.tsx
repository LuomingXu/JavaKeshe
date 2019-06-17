import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';
import student from "app/modules/system/student/student";
import StudentDetail  from "app/modules/system/student/student-detail";

const Routes = ({match}) => (
    <Switch>
        <ErrorBoundaryRoute exact path={`${match.url}/detail`} component={StudentDetail}/>
        <ErrorBoundaryRoute exact path={`${match.url}/new`} component={StudentDetail}/>
        <ErrorBoundaryRoute path={match.url} component={student}/>
    </Switch>
);

export default Routes;
