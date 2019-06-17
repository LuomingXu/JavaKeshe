export interface ILaboratory {
  id?: any;
  name?: string;
  place?: string;
}

export const defaultValue: Readonly<ILaboratory> = {
  id: '',
  name: '',
    place: ''
};
