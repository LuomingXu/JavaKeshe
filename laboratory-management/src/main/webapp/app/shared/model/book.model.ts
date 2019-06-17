export interface IBook {
  id?: any;
  name?: string;
  del?: boolean;
  lastModify?: Date;
}

export const defaultValue: Readonly<IBook> = {
  id: '',
  name: '',
  del: false,
  lastModify: null
};
