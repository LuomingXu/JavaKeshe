import React from 'react';
import {defaultValue, IStudent} from "app/shared/model/student.model";
import {FAILURE, REQUEST, SUCCESS} from "app/shared/reducers/action-type.util";
import {ICrudGetAction} from "react-jhipster";
import {IBook} from "app/shared/model/book.model";
import axios from "axios";
import value from "*.json";

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
    GET_STUDENTS: '/student/GET_STUDENTS'
};

const initialState = {
    student: defaultValue,
    errorMessage: 'default message',
    updateSuccess:false,
    students: [] as ReadonlyArray<IStudent>,
    page: 0,
    size: 0,
    total: 0,
    keyword: '',
    isCreate: false,
    visible: false
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
                students:action.payload.data
            };
        case ACTION_TYPE.FETCH_STU:
            console.log(action.payload);
            return {
                ...state,
                students: action.payload.data.list,
                total: action.payload.data.total,
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
                ...state
            };
        case FAILURE(ACTION_TYPE.DELETE_STUDENT):
        case FAILURE(ACTION_TYPE.FETCH_STU):
        case FAILURE(ACTION_TYPE.FETCH_STU_BY_ID):
        case FAILURE(ACTION_TYPE.FETCH_STU_ALL):
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

const apiUri = '/api/student';


export const getStudentById: ICrudGetAction<IStudent> = (id) => {
    const requestUrl = `${apiUri}/${id}`;
    return {
        type: ACTION_TYPE.FETCH_STU_BY_ID,
        payload: axios.get<IBook>(requestUrl)
    };
};

export const getStudentss = (page, size, keyword) => {
    const requestUrl = `${apiUri}/getStudents/${page}/${size}?keyword=${keyword}`;
    console.log(requestUrl);
    const result= {
        type: ACTION_TYPE.FETCH_STU,
        payload: axios.get(requestUrl)
    };
    // console.log(result.payload);
    // dispatch(changePage(page, size));
    return result;
};

export const changePage = (page, size) =>  {
   return  {
        type: ACTION_TYPE.CHANGE_PAGE,
        payload: { page:page, size: size }
   };
};

export const initStudents = value => {
    return {
        type: ACTION_TYPE.INIT_STUDENTS,
        payload: ''
    };
};

export const deleteStudent = id => async dispatch => {
    const requestUrl = `${apiUri}/delete/${id}`;
    const result = {
        type: ACTION_TYPE.DELETE_STUDENT,
        payload: axios.delete(requestUrl)
    };
    dispatch(getStudents(1, 20, ''));
    return result;
};

export const handleSubmit = value =>  async dispatch => {
    const requestUrl = `${apiUri}/update`;
    const result = {
        type:ACTION_TYPE.STUDENT_UPDATE,
        payload: axios.post(requestUrl, value)
    };
    dispatch(getStudentById(value.id));
    return result;
};

export const changeStatus = value => {
    console.log('value: ' + value);
    return {
        type: ACTION_TYPE.CHANGE_STATUE,
        payload: value
    };
};

export const setStudent = value => {
    return {
        type: ACTION_TYPE.SET_STUDENT,
        payload: value
    }
};

export const setVisible = value => {
    return {
        type:ACTION_TYPE.SET_VISIBLE,
        payload: value
    };
};


export const getStudents = (page, size, keyword)   => {
    const requestUrl = `${apiUri}/getStudents/${page}/${size}?keyword=${keyword}`;
    const result = {
        type: ACTION_TYPE.GET_STUDENTS,
        payload: axios.get(requestUrl)
    };
    console.log("get students:  " + result.payload);
    return result;
};





