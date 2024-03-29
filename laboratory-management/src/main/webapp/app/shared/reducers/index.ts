import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
import student, { StudentState } from 'app/modules/system/student/student.reducer';
import { combineReducers } from 'redux';
import teacher, { TeacherState } from 'app/modules/system/teacher/teacher.reducer';
import experiment, { ExperimentState } from 'app/modules/system/experiment/experiment.reducer';
import laboratory, { LaboratoryState } from 'app/modules/system/lab/laboratory.reducer';

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly loadingBar: any;
  readonly student: StudentState;
  readonly teacher: TeacherState;
  readonly experiment: ExperimentState;
  readonly laboratory: LaboratoryState;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  loadingBar,
  student,
  teacher,
  experiment,
  laboratory
});

export default rootReducer;
