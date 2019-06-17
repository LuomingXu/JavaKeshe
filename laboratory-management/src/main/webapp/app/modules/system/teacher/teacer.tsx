import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Divider, Drawer, Form, Input, Modal, Select, Table } from 'antd';
import { createTeacher, deleteTeacher, getTeachers, setTeacher, setVisible } from 'app/modules/system/teacher/teacher.reducer';

export interface ITeacher extends StateProps, DispatchProps, RouteComponentProps<{}> {}

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

// @ts-ignore
const columns = (match, history, props) => [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: '8%'
  },
  {
    title: '编号',
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
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => {
            props.setTeacher(record);
            history.push(`${match.url}/detail`);
          }}
        >
          {' '}
          detail
        </Button>
        <Divider type="vertical" />
        <Button onClick={() => showConfirm(props.deleteTeacher, record.id)}>delete</Button>
      </span>
    )
  }
];

function showConfirm(deleteTeacher, id) {
  confirm({
    title: '确定要删除',
    content: 'id: ' + id,
    onOk() {
      deleteTeacher(id);
      location.reload();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}

export class Teacher extends React.Component<ITeacher> {
  componentDidMount() {
    this.props.getTeachers(1, 8, this.props.keyword);
  }

  showDrawer = () => {
    this.props.setVisible(true);
  };

  onClose = () => {
    this.props.setVisible(false);
  };

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
    teacher.id = null;
    this.props.createTeacher(teacher);
    this.props.setVisible(false);
    location.reload();
  };

  handlePageChange = (pagination, filters, sorter) => {
    this.props.getTeachers(pagination.current, this.props.size, this.props.keyword);
  };

  render() {
    const { match, history, account, teachers, teacher, size, page, total, visible, keyword } = this.props;
    const pagination = {
      pageSize: size,
      current: page,
      total: total
    };

    return (
      <div>
        <Search placeholder="input search text" onSearch={value => this.props.getTeachers(1, 8, value)} style={{ width: 200 }} />
        <Button type="primary" size={'default'} style={{ float: 'right' }} onClick={() => this.showDrawer()}>
          创建
        </Button>
        <Table
          columns={columns(match, history, this.props)}
          rowKey={account.login}
          dataSource={teachers}
          pagination={pagination}
          onChange={this.handlePageChange}
        />
        <Drawer title="Basic Drawer" placement="right" width={500} closable={false} onClose={this.onClose} visible={visible}>
          <Form {...formItemLayout}>
            <Form.Item label="编号" style={{ width: 400 }}>
              <Input onChange={value => this.handleNumberChange(value, teacher)} />
            </Form.Item>
            <Form.Item label="姓名" style={{ width: 400 }}>
              <Input onChange={value => this.handleNameChange(value, teacher)} />
            </Form.Item>
            <Form.Item label="学院" style={{ width: 400 }}>
              <Input onChange={value => this.handleDeptChange(value, teacher)} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={() => this.handleSubmit(teacher)}>
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
  teachers: storeState.teacher.teachers,
  teacher: storeState.teacher.teacher,
  page: storeState.teacher.page,
  size: storeState.teacher.size,
  total: storeState.teacher.total,
  visible: storeState.teacher.visible,
  keyword: storeState.teacher.keyword
});

const mapDispatchToProps = {
  setVisible,
  getTeachers,
  createTeacher,
  deleteTeacher,
  setTeacher
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Teacher);
