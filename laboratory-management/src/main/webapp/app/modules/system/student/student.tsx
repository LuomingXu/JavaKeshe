import React from 'react';
import { getSession } from 'app/shared/reducers/authentication';
import { connect } from 'react-redux';
import {
  changeStatus,
  createStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  initStudents,
  setKeyword,
  setStudent,
  setVisible
} from 'app/modules/system/student/student.reducer';
import { Button, Divider, Drawer, Form, Input, Modal, Select, Table } from 'antd';
import { RouteComponentProps } from 'react-router-dom';

export interface IStudentProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

const confirm = Modal.confirm;
const Search = Input.Search;
// @ts-ignore
const columns = (match, history, props) => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: '8%'
  },
  {
    title: '学号',
    dataIndex: 'number',
    sorter: true,
    width: '10%'
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '院系',
    dataIndex: 'department'
  },
  {
    title: '专业',
    dataIndex: 'specialty'
  },
  {
    title: '班级',
    dataIndex: 'className'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => {
            props.changeStatus(false);
            props.setStudent(record);
            history.push(`${match.url}/detail`);
          }}
        >
          detail
        </Button>
        <Divider type="vertical" />
        <Button onClick={() => showConfirm(props.deleteStudent, record.id)}>delete</Button>
      </span>
    )
  }
];

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

const specialties = ['计算机科学与技术', '软件工程', '通信', '物联网'];

// 确认框
function showConfirm(deleteStudent, id) {
  confirm({
    title: '确定要删除',
    content: 'id: ' + id,
    onOk() {
      deleteStudent(id);
      location.reload();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}

class Student extends React.Component<IStudentProp> {
  componentDidMount() {
    this.props.getSession();
    this.getStudents(1, 8, this.props.keyword);
  }

  getStudents = (page, size, keyword) => {
    this.props.getStudents(page, size, keyword);
    this.props.setKeyword(keyword);
  };

  showDrawer = () => {
    this.props.setVisible(true);
  };
  onClose = () => {
    this.props.setVisible(false);
  };
  handleNameChange = (value, student) => {
    student.name = value.target.value;
  };
  handleGenderChange = (value, student) => {
    if (value == 'male') {
      student.sex = true;
    } else {
      student.sex = false;
    }
  };
  handleDeptChange = (value, student) => {
    student.department = value.target.value;
  };
  handleSpecChange = (value, student) => {
    student.specialty = value;
  };
  handleClassChange = (value, student) => {
    student.className = value.target.value;
  };

  handleNumberChange = (value, student) => {
    student.number = value.target.value;
  };

  handleSubmit = value => {
    this.props.createStudent(value);
    this.props.setVisible(false);
  };

  handlePageChange = (pagination, filters, sorter) => {
    this.props.getStudents(pagination.current, this.props.size, this.props.keyword);
  };

  render() {
    const { account, match, students, page, size, total, history, visible, isCreate, student } = this.props;

    const pagination = {
      pageSize: size,
      current: page,
      total: total
    };

    return (
      <div>
        <Search
          placeholder="input search text"
          onSearch={value => {
            this.getStudents(1, 2, value);
          }}
          style={{ width: 200 }}
        />
        <Button
          type="primary"
          size={'default'}
          style={{ float: 'right' }}
          onClick={() => {
            this.props.changeStatus(true);
            // this.props.history.push(`${match.url}/new`);
            this.showDrawer();
          }}
        >
          创建
        </Button>
        <Table
          columns={columns(match, history, this.props)}
          rowKey={account.login}
          dataSource={students}
          pagination={pagination}
          onChange={this.handlePageChange}
        />
        <Drawer title="Basic Drawer" placement="right" width={500} closable={false} onClose={this.onClose} visible={visible}>
          <Form {...formItemLayout}>
            <Form.Item label="学号" style={{ width: 400 }}>
              <Input style={{ width: 300 }} onChange={value => this.handleNumberChange(value, student)} />
            </Form.Item>
            <Form.Item label="姓名" style={{ width: 400 }}>
              <Input defaultValue={student.name} onChange={value => this.handleNameChange(value, student)} />
            </Form.Item>
            <Form.Item label="性别" style={{ width: 400 }}>
              <Select style={{ width: 50 }} onChange={value => this.handleGenderChange(value, student)}>
                <Option value="male">男</Option>
                <Option value="female">女</Option>
              </Select>
            </Form.Item>

            <Form.Item label="学院" style={{ width: 400 }}>
              <Input onChange={value => this.handleDeptChange(value, student)} />
            </Form.Item>
            <Form.Item label="专业" style={{ width: 400 }}>
              <Select style={{ width: 300 }} onChange={value => this.handleSpecChange(value, student)}>
                {specialties.map(specialty => (
                  <Option key={specialty}>{specialty}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="班级" style={{ width: 400 }}>
              <Input onChange={value => this.handleClassChange(value, student)} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={() => this.handleSubmit(student)}>
                提交
              </Button>
            </Form.Item>
          </Form>
        </Drawer>
      </div>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  student: storeState.student.student,
  students: storeState.student.students,
  page: storeState.student.page,
  size: storeState.student.size,
  total: storeState.student.total,
  isCreate: storeState.student.isCreate,
  visible: storeState.student.visible,
  keyword: storeState.student.keyword
});

const mapDispatchToProps = {
  getSession,
  getStudentById,
  getStudents,
  initStudents,
  deleteStudent,
  changeStatus,
  setStudent,
  setVisible,
  createStudent,
  setKeyword
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Student);
