export interface ITeacher {
    id?:any;
    name?:string;
    number?:string;
    sex?:boolean;
    dept?:string;
}

export const defaultValue: Readonly<ITeacher> = {
    id: '',
    name: '',
    number: '',
    sex: false,
    dept: ''
};
