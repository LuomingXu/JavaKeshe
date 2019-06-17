import React from 'react';
import { createTeacher, deleteTeacher, getTeachers, setVisible, updateTeacher } from 'app/modules/system/teacher/teacher.reducer';
import { connect } from 'react-redux';
import { Teacher } from 'app/modules/system/teacher/teacer';
import { Button, Divider, Form, Input, Modal } from 'antd';
import { RouteComponentProps } from 'react-router';

export interface ITeacherDetailProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const confirm = Modal.confirm;
const Search = Input.Search;

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

export class TeacherDetail extends React.Component<ITeacherDetailProps> {
  handleNameChange = (value, student) => {
    student.name = value.target.value;
  };

  handleDeptChange = (value, teacher) => {
    teacher.department = value.target.value;
  };
  handleNumberChange = (value, teacher) => {
    teacher.number = value.target.value;
  };
  handleSubmit = teacher => {
    this.props.updateTeacher(teacher);
    this.props.history.push('/system/teacher');
    this.props.getTeachers(1, 8, this.props.keyword);
  };

  render() {
    const { teacher } = this.props;
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="编号" style={{ width: 400 }}>
            <Input defaultValue={teacher.number} onChange={value => this.handleNumberChange(value, teacher)} />
          </Form.Item>
          <Form.Item label="姓名" style={{ width: 400 }}>
            <Input defaultValue={teacher.name} onChange={value => this.handleNameChange(value, teacher)} />
          </Form.Item>
          <Form.Item label="学院" style={{ width: 400 }}>
            <Input defaultValue={teacher.department} onChange={value => this.handleDeptChange(value, teacher)} />
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={() => this.handleSubmit(teacher)}>
              提交
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  teacher: storeState.teacher.teacher,
  keyword: storeState.teacher.keyword
});

const mapDispatchToProps = {
  setVisible,
  getTeachers,
  createTeacher,
  deleteTeacher,
  updateTeacher
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeacherDetail);
