import { defaultValue, IExperiment } from 'app/shared/model/experiment.model';
import { FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import axios from 'axios';
export const ACTION_TYPE = {
  GET_EXPERIMENTS: 'experiment/GET_EXPERIMENTS',
  GET_EXPERIMENT: 'experiment/GET_EXPERIMENT',
  CREATE_EXPERIMENT: 'experiment/CREATE_EXPERIMENT',
  DEL_EXPERIMENT: 'experiment/CREATE_EXPERIMENT',
  EDIT_EXPERIMENT: 'experiment/EDIT_EXPERIMENT',
  SET_VISIBLE: 'experiment/SET_VISIBLE',
  SET_EXPERIMENT: 'experiment/SET_EXPERIMENT',
  GET_EXPERIMENT_GRADES: 'experiment/GET_EXPERIMENT_GRADES',
  ADD_GRADES: '/experiment/ADD_GRADES'
};

export const initialState = {
  experiments: [] as ReadonlyArray<IExperiment>,
  experiment: defaultValue,
  errorMessage: 'default message',
  page: 0,
  size: 0,
  total: 0,
  visible: false,
  keyword: '',
  isSuccess: false,
  grades: []
};

export type ExperimentState = Readonly<typeof initialState>;

export default (state: ExperimentState = initialState, action): ExperimentState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPE.GET_EXPERIMENTS):
      console.log(action.payload);
      return {
        ...state,
        experiments: action.payload.data.list,
        total: action.payload.data.total
        // size: action.payload.data.size
      };
    case SUCCESS(ACTION_TYPE.DEL_EXPERIMENT):
      return {
        ...state,
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.EDIT_EXPERIMENT):
      return {
        ...state,
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.GET_EXPERIMENT):
      return {
        ...state,
        experiment: action.payload.experiment
      };
    case SUCCESS(ACTION_TYPE.CREATE_EXPERIMENT):
      return {
        ...state,
        experiment: action.payload.experiment
      };
    case SUCCESS(ACTION_TYPE.GET_EXPERIMENT_GRADES):
      return {
        ...state,
        grades: action.payload.data
      };
    case ACTION_TYPE.SET_VISIBLE:
      return {
        ...state,
        visible: action.payload
      };
    case ACTION_TYPE.SET_EXPERIMENT:
      return {
        ...state,
        experiment: action.payload
      };
    case FAILURE(ACTION_TYPE.GET_EXPERIMENTS):
    case FAILURE(ACTION_TYPE.DEL_EXPERIMENT):
    case FAILURE(ACTION_TYPE.CREATE_EXPERIMENT):
    case FAILURE(ACTION_TYPE.GET_EXPERIMENT):
    case FAILURE(ACTION_TYPE.EDIT_EXPERIMENT):
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
};

const apiUri = 'api/experiment';

export const setVisible = value => {
  return {
    type: ACTION_TYPE.SET_VISIBLE,
    payload: value
  };
};

export const createExperiment = experiment => {
  const request = `${apiUri}/add`;
  console.log(experiment);
  console.log(request);

  return {
    type: ACTION_TYPE.CREATE_EXPERIMENT,
    payload: axios.post(request, experiment)
  };
};

export const deleteExperiment = id => {
  const request = `${apiUri}/${id}`;
  return {
    type: ACTION_TYPE.DEL_EXPERIMENT,
    payload: axios.delete(request)
  };
};

export const getExperiments = (page, size, keyword) => {
  const request = `${apiUri}/all/${page}/${size}`;
  return {
    type: ACTION_TYPE.GET_EXPERIMENTS,
    payload: axios.get(request)
  };
};

export const updateExperiment = value => {
  const request = `${apiUri}/update`;
  return {
    type: ACTION_TYPE.EDIT_EXPERIMENT,
    payload: axios.post(request, value)
  };
};

export const setExperiment = value => {
  return {
    type: ACTION_TYPE.SET_EXPERIMENT,
    payload: value
  };
};

const gradeApi = '/api/grade';

export const getExperimentGrades = number => {
  const request = `/api/grade/search/experimentNo?experimentNo=${number}`;
  console.log(request);
  return {
    type: ACTION_TYPE.GET_EXPERIMENT_GRADES,
    payload: axios.get(request)
  };
};

export const submitGrade = grades => {
  const request = `${gradeApi}/update`;
  console.log(grades);
  return {
    type: ACTION_TYPE.ADD_GRADES,
    payload: axios.post(request, grades)
  };
};
