export interface ILaboratory {
  id?: any;
  name?: string;
  location?: string;
}

export const defaultValue: Readonly<ILaboratory> = {
  id: '',
  name: '',
  location: ''
};
