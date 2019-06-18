import { defaultValue, IStudent } from 'app/shared/model/student.model';
import { FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import { ICrudGetAction } from 'react-jhipster';
import { IBook } from 'app/shared/model/book.model';
import axios from 'axios';

export const ACTION_TYPE = {
  FETCH_STU_ALL: 'student/FETCH_STU_ALL',
  FETCH_STU: 'student/FETCH_STU',
  FETCH_STU_BY_ID: 'student/FETCH_STU_BY_ID',
  CHANGE_PAGE: 'student/CHANGE_PAGE',
  INIT_STUDENTS: 'student/INIT_STUDENTS',
  DELETE_STUDENT: 'student/DELETE_STUDENT',
  STUDENT_UPDATE: 'student/STUDENT_UPDATE',
  CHANGE_STATUE: 'student/CHANGE_STATUE',
  SET_STUDENT: 'student/SET_STUDENT',
  SET_VISIBLE: 'student/SET_VISIBLE',
  GET_STUDENTS: '/student/GET_STUDENTS',
  CREATE_STUDENT: '/student/CREATE_STUDENT',
  SET_KEYWORD: '/student/SET_KEYWORD'
};

const initialState = {
  student: defaultValue,
  errorMessage: 'default message',
  updateSuccess: false,
  students: [] as ReadonlyArray<IStudent>,
  page: 0,
  size: 0,
  total: 0,
  keyword: '',
  isCreate: false,
  visible: false,
  isSuccess: false
};

export default (state: StudentState = initialState, action): StudentState => {
  // tslint:disable-next-line:switch-default
  switch (action.type) {
    case SUCCESS(ACTION_TYPE.GET_STUDENTS):
      console.log(action.payload);
      return {
        ...state,
        students: action.payload.data.list,
        total: action.payload.data.total,
        page: action.payload.data.page,
        size: action.payload.data.size
      };
    case SUCCESS(ACTION_TYPE.FETCH_STU_BY_ID):
      return {
        ...state,
        student: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.FETCH_STU_ALL):
      return {
        ...state,
        students: action.payload.data
      };
    case ACTION_TYPE.FETCH_STU:
      console.log(action.payload);
      return {
        ...state,
        students: action.payload.data.list,
        total: action.payload.data.total
      };
    case SUCCESS(ACTION_TYPE.CHANGE_PAGE):
      return {
        ...state,
        page: action.payload.page,
        size: action.payload.size
      };
    case ACTION_TYPE.INIT_STUDENTS:
      return {
        ...state,
        students: [state.student]
      };
    case SUCCESS(ACTION_TYPE.DELETE_STUDENT):
      return {
        ...state,
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.CREATE_STUDENT):
      return {
        ...state,
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.STUDENT_UPDATE):
      return {
        ...state,
        isSuccess: action.payload.data
      };

    case ACTION_TYPE.SET_KEYWORD:
      return {
        ...state,
        keyword: action.payload
      };
    case FAILURE(ACTION_TYPE.DELETE_STUDENT):
    case FAILURE(ACTION_TYPE.FETCH_STU):
    case FAILURE(ACTION_TYPE.FETCH_STU_BY_ID):
    case FAILURE(ACTION_TYPE.GET_STUDENTS):
    case FAILURE(ACTION_TYPE.STUDENT_UPDATE):
      return {
        ...state,
        errorMessage: action.payload,
        updateSuccess: false
      };
    case ACTION_TYPE.CHANGE_STATUE:
      console.log('payload: ' + action.payload);
      return {
        ...state,
        isCreate: action.payload
      };
    case ACTION_TYPE.SET_STUDENT:
      return {
        ...state,
        student: action.payload
      };
    case ACTION_TYPE.SET_VISIBLE:
      return {
        ...state,
        visible: action.payload
      };
    default:
      return state;
  }
};

export type StudentState = Readonly<typeof initialState>;

const apiUri = '/api/StuTeach';

export const getStudentById: ICrudGetAction<IStudent> = id => {
  const requestUrl = `${apiUri}/${id}`;
  return {
    type: ACTION_TYPE.FETCH_STU_BY_ID,
    payload: axios.get<IBook>(requestUrl)
  };
};

export const initStudents = value => {
  return {
    type: ACTION_TYPE.INIT_STUDENTS,
    payload: ''
  };
};

export const deleteStudent = id => {
  const requestUrl = `${apiUri}/${id}`;
  return {
    type: ACTION_TYPE.DELETE_STUDENT,
    payload: axios.delete(requestUrl)
  };
};

export const changeStatus = value => {
  return {
    type: ACTION_TYPE.CHANGE_STATUE,
    payload: value
  };
};

export const setStudent = value => {
  return {
    type: ACTION_TYPE.SET_STUDENT,
    payload: value
  };
};

export const setVisible = value => {
  return {
    type: ACTION_TYPE.SET_VISIBLE,
    payload: value
  };
};

export const getStudents = (page, size, keyword) => {
  const requestUrl = `${apiUri}/search/${page}/${size}?is_teacher=${false}&&keyword=${keyword}`;
  return {
    type: ACTION_TYPE.GET_STUDENTS,
    payload: axios.get(requestUrl)
  };
};

export const createStudent = value => {
  const request = `${apiUri}/add`;
  return {
    type: ACTION_TYPE.CREATE_STUDENT,
    payload: axios.post(request, value)
  };
};

export const updateStudent = value => {
  const request = `${apiUri}/update`;
  return {
    type: ACTION_TYPE.STUDENT_UPDATE,
    payload: axios.post(request, value)
  };
};

export const setKeyword = value => {
  return {
    type: ACTION_TYPE.SET_KEYWORD,
    payload: value
  };
};
