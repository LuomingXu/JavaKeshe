import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, DatePicker, Divider, Drawer, Form, Input, Modal, Select, Table, Popconfirm } from 'antd';

import {
  addStudents,
  createExperiment,
  deleteExperiment,
  getExperiments,
  handleStuIds,
  setExperiment,
  setVisible
} from 'app/modules/system/experiment/experiment.reducer';
import { getStudents } from 'app/modules/system/student/student.reducer';

export interface IExperiment extends StateProps, DispatchProps, RouteComponentProps<{}> {}

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
    dataIndex: 'no',
    sorter: true,
    width: '10%'
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: '10%'
  },
  {
    title: '教师',
    dataIndex: 'teacher'
  },
  {
    title: '地点',
    dataIndex: 'location'
  },
  {
    title: '日期',
    dataIndex: 'date'
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => {
            props.setExperiment(record);
            history.push(`${match.url}/detail`);
          }}
        >
          {' '}
          detail
        </Button>
        <Divider type="vertical" />
        <Button onClick={() => showConfirm(props.deleteExperiment, record.id)}>delete</Button>
      </span>
    )
  }
];

function showConfirm(deleteExperiment, id) {
  confirm({
    title: '确定要删除',
    content: 'id: ' + id,
    onOk() {
      deleteExperiment(id);
      location.reload();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}

export class Experiment extends React.Component<IExperiment> {
  componentDidMount() {
    this.props.getExperiments(1, 8, this.props.keyword);
    this.props.getStudents(1, 100, '');
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

  handleNumberChange = (value, experiment) => {
    experiment.no = value.target.value;
  };
  handleSubmit = experiment => {
    experiment.id = null;
    this.props.createExperiment(experiment);
    this.props.setVisible(false);
    this.props.getExperiments(1, 8, '');
  };

  HandleContentChange = (value, experiment) => {
    experiment.content = value.target.value;
  };

  handleTeacherChange = (value, experiment) => {
    experiment.teacher = value.target.value;
  };

  handleDateChange = (value, experiment) => {
    experiment.date = value;
  };
  handleLocationChange = (value, experiment) => {
    experiment.location = value.target.value;
  };
  handlePageChange = (pagination, filters, sorter) => {
    this.props.getExperiments(pagination.current, this.props.size, this.props.keyword);
  };
  // 对于实现添加学生
  handleChange = (value, students) => {
    let ids = [];
    value.map(index => {
      console.log(students[index]);
    });

    for (let i = 0; i < value.length; i++) {
      ids[i] = students[value[i]].id;
    }
    this.props.handleStuIds(ids);
  };

  handleAddStudents = ids => {
    this.props.addStudents(this.props.experiment.id, ids);
  };

  render() {
    const { match, history, account, experiments, experiment, size, page, total, visible, students, keyword } = this.props;
    const pagination = {
      pageSize: size,
      current: page,
      total: total
    };
    const children = [];
    students.map(student => {
      children.push(
        <Option key={student.id}>
          {student.number}-{student.name}
        </Option>
      );
    });
    return (
      <div>
        <Search placeholder="input search text" onSearch={value => this.props.getExperiments(1, 8, value)} style={{ width: 200 }} />
        <Button type="primary" size={'default'} style={{ float: 'right' }} onClick={() => this.showDrawer()}>
          创建
        </Button>
        <Table
          columns={columns(match, history, this.props)}
          rowKey={account.login}
          dataSource={experiments}
          expandedRowRender={record => <p style={{ margin: 0 }}>{record.content}</p>}
          pagination={pagination}
          onChange={this.handlePageChange}
        />
        <Drawer title="Basic Drawer" placement="right" width={500} closable={false} onClose={this.onClose} visible={visible}>
          <Form {...formItemLayout}>
            <Form.Item label="编号" style={{ width: 400 }}>
              <Input onChange={value => this.handleNumberChange(value, experiment)} />
            </Form.Item>
            <Form.Item label="实验名称" style={{ width: 400 }}>
              <Input onChange={value => this.handleNameChange(value, experiment)} />
            </Form.Item>
            <Form.Item label="教师" style={{ width: 400 }}>
              <Input onChange={value => this.handleTeacherChange(value, experiment)} />
            </Form.Item>
            <Form.Item label="日期" style={{ width: 400 }}>
              <DatePicker onChange={value => this.handleDateChange(value, experiment)} />
            </Form.Item>
            <Form.Item label="地点" style={{ width: 400 }}>
              <Input onChange={value => this.handleLocationChange(value, experiment)} />
            </Form.Item>
            <Form.Item label="内容" style={{ width: 400 }}>
              <Input onChange={value => this.HandleContentChange(value, experiment)} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={() => this.handleSubmit(experiment)}>
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
  experiments: storeState.experiment.experiments,
  experiment: storeState.experiment.experiment,
  page: storeState.experiment.page,
  size: storeState.experiment.size,
  total: storeState.experiment.total,
  visible: storeState.experiment.visible,
  keyword: storeState.experiment.keyword,
  students: storeState.student.students
});

const mapDispatchToProps = {
  setVisible,
  getExperiments,
  createExperiment,
  deleteExperiment,
  setExperiment,
  getStudents,
  handleStuIds,
  addStudents
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Experiment);
