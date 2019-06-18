export interface IExperiment {
  id?: any;
  name?: string;
  no?: string;
  teacher?: string;
  location?: string;
  date?: Date;
  content?: string;
  // 相关学生分数 {'number':1, name':'syun','score':9 },
  // {'id':2, content:{'name':'syun','score':90}}
}

export const defaultValue: Readonly<IExperiment> = {
  id: '',
  name: '',
  no: '',
  teacher: '',
  location: '',
  date: null,
  content: ''
};
