export interface IGrade {
  experimentName?: string;
  studentName?:string;
  grade?:string;
}

export const defaultValue: Readonly<IGrade> = {
    experimentName: '',
    studentName: '',
    grade:''
};
