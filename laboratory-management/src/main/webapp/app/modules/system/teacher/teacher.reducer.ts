import {defaultValue, ITeacher} from "app/shared/model/teacher.model";
import {FAILURE, SUCCESS} from "app/shared/reducers/action-type.util";
import axios from "axios";
export const ACTION_TYPE = {
    GET_TEACHERS: 'teacher/GET_TEACHERS',
    GET_TEACHER: 'teacher/GET_TEACHER',
    CREATE_TEACHER: 'teacher/CREATE_TEACHER',
    DEL_TEACHER: 'teacher/CREATE_TEACHER',
    EDIT_TEACHER: 'teacher/EDIT_TEACHER',
    SET_VISIBLE: '/teacher/SET_VISIBLE'
};

export const initialState = {
    teachers:[] as ReadonlyArray<ITeacher>,
    teacher: defaultValue,
    errorMessage: 'default message',
    page: 0,
    size: 0,
    total: 0,
    visible: false,
    keyword: '',
    isSuccess: false
};


export type TeacherState = Readonly<typeof initialState>;

export default (state: TeacherState = initialState, action): TeacherState => {

    switch (action.type) {
        case SUCCESS(ACTION_TYPE.GET_TEACHERS):
            return {
                ...state,
                teachers: action.payload.list,
                total: action.payload.total,
                size: action.payload.size
            };
        case SUCCESS(ACTION_TYPE.DEL_TEACHER):
            return {
                ...state,
                isSuccess:action.payload.data
            };
        case SUCCESS(ACTION_TYPE.EDIT_TEACHER):
            return {
                ...state,
                isSuccess: action.payload.data
            };
        case SUCCESS(ACTION_TYPE.GET_TEACHER):
            return {
                ...state,
                teacher: action.payload.teacher
            };
        case SUCCESS(ACTION_TYPE.CREATE_TEACHER):
            return {
                ...state,
                teacher: action.payload.teacher
            };
        case ACTION_TYPE.SET_VISIBLE:
            return {
                ...state,
                visible: action.payload
            };
        case FAILURE(ACTION_TYPE.GET_TEACHERS):
        case FAILURE(ACTION_TYPE.DEL_TEACHER):
        case FAILURE(ACTION_TYPE.CREATE_TEACHER):
        case FAILURE(ACTION_TYPE.GET_TEACHER):
        case FAILURE(ACTION_TYPE.EDIT_TEACHER):
            return {
                ...state,
                errorMessage: action.payload.errorMessage
            };
        default:
            return state;
    }


}

const apiUri = 'api/teacher';


export const setVisible = value => {
    return {
        type:ACTION_TYPE.SET_VISIBLE,
        payload: value
    };
};


export const createTeacher = teacher => {
    const request = `${apiUri}/add`;
    return {
        type:ACTION_TYPE.CREATE_TEACHER,
        payload: axios.post(request, teacher)
    };
};

export const deleteTeacher = id => {
    const request = `${apiUri}/${id}`;
    return {
        type:ACTION_TYPE.DEL_TEACHER,
        payload: axios.delete(request)
    };
};

export const getTeachers = (page, size, keyword) => {
    const request = `${apiUri}/getTeachers/${page}/${size}?keyword=${keyword}`;
    return {
        type: ACTION_TYPE.GET_TEACHERS,
        payload: axios.get(request)
    };
};





