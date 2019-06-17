export interface IStudent {
  id?: any;
  name?: string;
  number?: string;
  sex?: boolean;
  age?: number;
  department?: string;
  specialty?: string;
  className?: string;
  isDel?: boolean;
}

export const defaultValue: Readonly<IStudent> = {
  id: null,
  name: '',
  number: '',
  sex: null,
  age: null,
  department: '',
  specialty: '',
  className: '',
  isDel: null
};
