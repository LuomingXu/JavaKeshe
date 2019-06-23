import React from 'react';
import {
  addStudents,
  createExperiment,
  deleteExperiment,
  getExperimentGrades,
  getExperiments,
  handleStuIds,
  setVisible,
  submitGrade,
  updateExperiment
} from 'app/modules/system/experiment/experiment.reducer';
import { connect } from 'react-redux';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Select, Table } from 'antd';
import { RouteComponentProps } from 'react-router';
import { getStudents } from 'app/modules/system/student/student.reducer';

export interface IExperimentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const confirm = Modal.confirm;
const Search = Input.Search;
const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0
    },
    sm: {
      span: 16,
      offset: 8
    }
  }
};

export class ExperimentDetail extends React.Component<IExperimentDetailProps> {
  componentDidMount(): void {
    // 渲染时加载分数数据
    this.props.getExperimentGrades(this.props.experiment.id);
  }

  handleNameChange = (value, student) => {
    student.name = value.target.value;
  };

  HandleContentChange = (value, experiment) => {
    experiment.content = value.target.value;
  };
  handleNumberChange = (value, experiment) => {
    experiment.number = value.target.value;
  };

  handleTeacherChange = (value, experiment) => {
    experiment.teacher = value.target.value;
  };

  handleDateChange = (value, experiment) => {
    experiment.date = value;
  };
  handleLocationChange = (value, experiment) => {
    experiment.loaction = value;
  };

  handleSubmit = experiment => {
    this.props.updateExperiment(experiment);
    this.handleAddStudents(this.props.studentIds);
    this.props.history.push('/system/experiment');
    this.props.getExperiments(1, 8, this.props.keyword);
    this.props.getExperiments(1, 8, '');
  };

  handleGradeChange = (value, record) => {
    record.grade = value;
  };

  handleGradeSubmit = grades => {
    this.props.submitGrade(grades);
    this.props.history.push('/system/experiment');
  };

  // 对于实现添加学生
  handleChange = (value, students) => {
    let ids = [];
    value.map(index => {
      ids.push(students[index - 1].id);
    });
    this.props.handleStuIds(ids);
  };

  handleAddStudents = ids => {
    this.props.addStudents(this.props.experiment.id, ids);
  };

  render() {
    const { experiment, students, grades } = this.props;
    const dateStr = experiment.date.toString();
    console.log(dateStr);
    // 无数据则不显示
    let tableShow = grades.length > 0 ? 'visible' : 'hidden';
    const children = [];
    students.map(student => {
      children.push(
        <Option key={student.id}>
          {student.number}-{student.name}
        </Option>
      );
    });
    // @ts-ignore
    return (
      <div>
        <Form {...formItemLayout} style={{ width: 500, float: 'left' }}>
          <Form.Item label="编号" style={{ width: 400 }}>
            <Input defaultValue={experiment.no} onChange={value => this.handleNumberChange(value, experiment)} />
          </Form.Item>
          <Form.Item label="名称" style={{ width: 400 }}>
            <Input defaultValue={experiment.name} onChange={value => this.handleNameChange(value, experiment)} />
          </Form.Item>
          <Form.Item label="教师" style={{ width: 400 }}>
            <Input defaultValue={experiment.teacher} onChange={value => this.handleTeacherChange(value, experiment)} />
          </Form.Item>
          <Form.Item label="日期" style={{ width: 400 }}>
            <label>{experiment.date}</label>
          </Form.Item>
          <Form.Item label="地点" style={{ width: 400 }}>
            <Input defaultValue={experiment.location} onChange={value => this.handleLocationChange(value, experiment)} />
          </Form.Item>
          <Form.Item label="内容" style={{ width: 400 }}>
            <Input defaultValue={experiment.content} onChange={value => this.HandleContentChange(value, experiment)} />
          </Form.Item>

          <Form.Item label="参与学生" style={{ width: 400 }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="选择参与学生"
              onChange={value => this.handleChange(value, students)}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={() => this.handleSubmit(experiment)}>
              修改
            </Button>
          </Form.Item>
        </Form>

        <table className="table table-bordered" style={{ width: 500, float: 'right', marginRight: 300, visibility: tableShow }}>
          <thead>
            <tr>
              <th>学号</th>
              <th>名称</th>
              <th>分数</th>
            </tr>
          </thead>
          <tbody>
            {grades.map(grade => {
              return (
                <tr key={grade.studentNo + Math.random()}>
                  <td>{grade.studentNo}</td>
                  <td>{grade.name}</td>
                  <td>
                    <InputNumber defaultValue={grade.grade} max={100} onChange={value => this.handleGradeChange(value, grade)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot />
          <Button type="primary" onClick={() => this.handleGradeSubmit(grades)}>
            提交
          </Button>
        </table>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  experiment: storeState.experiment.experiment,
  keyword: storeState.experiment.keyword,
  students: storeState.student.students,
  grades: storeState.experiment.grades,
  studentIds: storeState.experiment.studentIds
});

const mapDispatchToProps = {
  setVisible,
  getExperiments,
  createExperiment,
  deleteExperiment,
  updateExperiment,
  getExperimentGrades,
  submitGrade,
  getStudents,
  handleStuIds,
  addStudents
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExperimentDetail);
