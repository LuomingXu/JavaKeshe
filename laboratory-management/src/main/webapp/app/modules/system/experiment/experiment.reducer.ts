import { defaultValue, IExperiment } from 'app/shared/model/experiment.model';
import { FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import { message } from 'antd';
import axios from 'axios';

export const ACTION_TYPE = {
  GET_EXPERIMENTS: 'experiment/GET_EXPERIMENTS',
  GET_EXPERIMENT: 'experiment/GET_EXPERIMENT',
  CREATE_EXPERIMENT: 'experiment/CREATE_EXPERIMENT',
  DEL_EXPERIMENT: 'experiment/DEL_EXPERIMENT',
  EDIT_EXPERIMENT: 'experiment/EDIT_EXPERIMENT',
  SET_VISIBLE: 'experiment/SET_VISIBLE',
  SET_EXPERIMENT: 'experiment/SET_EXPERIMENT',
  GET_EXPERIMENT_GRADES: 'experiment/GET_EXPERIMENT_GRADES',
  ADD_GRADES: '/experiment/ADD_GRADES',
  HANDLE_STU_ID: '/experiment/HANDLE_STU_ID',
  ADD_STUDENTS: '/experiment/ADD_STUDENTS',
  SET_LOADING: '/experiment/SET_LOADING'
};

export const initialState = {
  experiments: [] as ReadonlyArray<IExperiment>,
  experiment: defaultValue,
  errorMessage: 'default message',
  page: 0,
  size: 8,
  total: 0,
  visible: false,
  keyword: '',
  isSuccess: false,
  grades: [],
  studentIds: [],
  loading: true
};

export type ExperimentState = Readonly<typeof initialState>;

export default (state: ExperimentState = initialState, action): ExperimentState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPE.GET_EXPERIMENTS):
      return {
        ...state,
        experiments: action.payload.data.list,
        total: action.payload.data.total,
        loading: false
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
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.GET_EXPERIMENT_GRADES):
      let grades = [];
      let students = action.payload.data.students;
      for (let i = 0; i < students.length; i++) {
        grades[i] = {
          experimentNo: state.experiment.no,
          studentNo: students[i].number,
          name: students[i].name,
          grade: students[i].grade
        };
      }
      return {
        ...state,
        grades: grades
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
    case ACTION_TYPE.HANDLE_STU_ID:
      return {
        ...state,
        studentIds: action.payload
      };
    case ACTION_TYPE.SET_LOADING:
      return {
        ...state,
        loading: action.payload
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
  const request = `${apiUri}/allWithGrades/${page}/${size}`;
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

export const getExperimentGrades = id => {
  const request = `/api/experiment/${id}/withStudent`;
  return {
    type: ACTION_TYPE.GET_EXPERIMENT_GRADES,
    payload: axios.get(request)
  };
};

export const submitGrade = grades => {
  const request = `${gradeApi}/update`;
  return {
    type: ACTION_TYPE.ADD_GRADES,
    payload: axios.post(request, grades)
  };
};

export const handleStuIds = value => {
  return {
    type: ACTION_TYPE.HANDLE_STU_ID,
    payload: value
  };
};

// 添加与实验相关学生
export const addStudents = (experimentId, stuIds) => {
  const request = `${apiUri}/addExperimentStudent?experimentId=${experimentId}`;
  return {
    type: ACTION_TYPE.ADD_STUDENTS,
    payload: axios.post(request, stuIds)
  };
};

export const setLoading = value => {
  return {
    type: ACTION_TYPE.SET_LOADING,
    payload: value
  };
};
