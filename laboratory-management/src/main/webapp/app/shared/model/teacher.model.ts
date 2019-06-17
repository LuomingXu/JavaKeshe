export interface ITeacher {
  id?: any;
  name?: string;
  number?: string;
  sex?: boolean;
  department?: string;
  isDel?: boolean;
}

export const defaultValue: Readonly<ITeacher> = {
  id: '',
  name: '',
  number: '',
  sex: false,
  department: '',
  isDel: true
};
