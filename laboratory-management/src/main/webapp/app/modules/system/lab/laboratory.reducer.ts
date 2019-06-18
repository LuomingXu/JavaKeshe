import { defaultValue, ILaboratory } from 'app/shared/model/laboratory.model';
import { FAILURE, SUCCESS } from 'app/shared/reducers/action-type.util';
import axios from 'axios';
import { IEquipment } from 'app/shared/model/equipment.model';

export const ACTION_TYPE = {
  GET_LABORATORIES: 'laboratory/GET_LABORATORIES',
  GET_LABORATORY: 'laboratory/GET_LABORATORY',
  CREATE_LABORATORY: 'laboratory/CREATE_LABORATORY',
  DEL_LABORATORY: 'laboratory/CREATE_LABORATORY',
  EDIT_LABORATORY: 'laboratory/EDIT_LABORATORY',
  SET_VISIBLE: 'laboratory/SET_VISIBLE',
  SET_LABORATORY: 'laboratory/SET_LABORATORY'
};

export const initialState = {
  laboratories: [] as ReadonlyArray<ILaboratory>,
  laboratory: defaultValue,
  errorMessage: 'default message',
  page: 0,
  size: 0,
  total: 0,
  visible: false,
  keyword: '',
  isSuccess: false,
  equipments: [] as ReadonlyArray<IEquipment>
};

export type LaboratoryState = Readonly<typeof initialState>;

export default (state: LaboratoryState = initialState, action): LaboratoryState => {
  switch (action.type) {
    case SUCCESS(ACTION_TYPE.GET_LABORATORIES):
      console.log(action.payload);
      return {
        ...state,
        laboratories: action.payload.data.list,
        total: action.payload.data.total,
        size: action.payload.data.size
      };
    case SUCCESS(ACTION_TYPE.DEL_LABORATORY):
      return {
        ...state,
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.EDIT_LABORATORY):
      return {
        ...state,
        isSuccess: action.payload.data
      };
    case SUCCESS(ACTION_TYPE.GET_LABORATORY):
      return {
        ...state,
        laboratory: action.payload.laboratory
      };
    case SUCCESS(ACTION_TYPE.CREATE_LABORATORY):
      return {
        ...state,
        laboratory: action.payload.laboratory
      };
    case ACTION_TYPE.SET_VISIBLE:
      return {
        ...state,
        visible: action.payload
      };
    case ACTION_TYPE.SET_LABORATORY:
      return {
        ...state,
        laboratory: action.payload
      };
    case FAILURE(ACTION_TYPE.GET_LABORATORIES):
    case FAILURE(ACTION_TYPE.DEL_LABORATORY):
    case FAILURE(ACTION_TYPE.CREATE_LABORATORY):
    case FAILURE(ACTION_TYPE.GET_LABORATORY):
    case FAILURE(ACTION_TYPE.EDIT_LABORATORY):
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      };
    default:
      return state;
  }
};

const apiUri = 'api/StuTeach';

export const setVisible = value => {
  return {
    type: ACTION_TYPE.SET_VISIBLE,
    payload: value
  };
};

export const createLaboratory = laboratory => {
  const request = `${apiUri}/add`;
  return {
    type: ACTION_TYPE.CREATE_LABORATORY,
    payload: axios.post(request, laboratory)
  };
};

export const deleteLaboratory = id => {
  const request = `${apiUri}/${id}`;
  return {
    type: ACTION_TYPE.DEL_LABORATORY,
    payload: axios.delete(request)
  };
};

export const getLaboratories = (page, size, keyword) => {
  const request = `${apiUri}/search/${page}/${size}?keyword=${keyword}`;
  return {
    type: ACTION_TYPE.GET_LABORATORIES,
    payload: axios.get(request)
  };
};

export const updateLaboratory = value => {
  const request = `${apiUri}/update`;
  return {
    type: ACTION_TYPE.EDIT_LABORATORY,
    payload: axios.post(request, value)
  };
};

export const setLaboratory = value => {
  return {
    type: ACTION_TYPE.SET_LABORATORY,
    payload: value
  };
};
