export interface IExperiment {
    id?: any;
    name?: string;
    number?: string;
    teacher?: string;
    place?: string;
    date?: Date;
    content?: string;
}

export const defaultValue: Readonly<IExperiment> = {
    id: '',
    name: '',
    number: '',
    teacher: '',
    place: '',
    date: null,
    content: '',
};
