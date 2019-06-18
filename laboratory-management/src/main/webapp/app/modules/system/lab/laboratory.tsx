import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Divider, Drawer, Form, Input, Modal, Select, Table } from 'antd';
import { createLaboratory, deleteLaboratory, getLaboratories, setLaboratory, setVisible } from 'app/modules/system/lab/laboratory.reducer';

export interface ILaboratories extends StateProps, DispatchProps, RouteComponentProps<{}> {}

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
            props.setLaboratories(record);
            history.push(`${match.url}/detail`);
          }}
        >
          {' '}
          detail
        </Button>
        <Divider type="vertical" />
        <Button onClick={() => showConfirm(props.deleteLaboratories, record.id)}>delete</Button>
      </span>
    )
  }
];

function showConfirm(deleteLaboratories, id) {
  confirm({
    title: '确定要删除',
    content: 'id: ' + id,
    onOk() {
      deleteLaboratories(id);
      location.reload();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}

export class Laboratories extends React.Component<ILaboratories> {
  componentDidMount() {
    this.props.getLaboratories(1, 8, this.props.keyword);
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

  handleDeptChange = (value, laboratory) => {
    laboratory.department = value.target.value;
  };
  handleNumberChange = (value, laboratory) => {
    laboratory.number = value.target.value;
  };
  handleSubmit = laboratory => {
    laboratory.id = null;
    this.props.createLaboratory(laboratory);
    this.props.setVisible(false);
    location.reload();
  };

  handlePageChange = (pagination, filters, sorter) => {
    this.props.getLaboratories(pagination.current, this.props.size, this.props.keyword);
  };

  render() {
    const { match, history, account, laboratories, laboratory, size, page, total, visible, keyword } = this.props;
    const pagination = {
      pageSize: size,
      current: page,
      total: total
    };

    return (
      <div>
        <Search placeholder="input search text" onSearch={value => this.props.getLaboratories(1, 8, value)} style={{ width: 200 }} />
        <Button type="primary" size={'default'} style={{ float: 'right' }} onClick={() => this.showDrawer()}>
          创建
        </Button>
        <Table
          columns={columns(match, history, this.props)}
          rowKey={account.login}
          dataSource={laboratories}
          pagination={pagination}
          onChange={this.handlePageChange}
        />
        <Drawer title="Basic Drawer" placement="right" width={500} closable={false} onClose={this.onClose} visible={visible}>
          <Form {...formItemLayout}>
            <Form.Item label="编号" style={{ width: 400 }}>
              <Input onChange={value => this.handleNumberChange(value, laboratory)} />
            </Form.Item>
            <Form.Item label="姓名" style={{ width: 400 }}>
              <Input onChange={value => this.handleNameChange(value, laboratory)} />
            </Form.Item>
            <Form.Item label="学院" style={{ width: 400 }}>
              <Input onChange={value => this.handleDeptChange(value, laboratory)} />
            </Form.Item>
            <Form.Item {...tailFormItemLayout}>
              <Button type="primary" onClick={() => this.handleSubmit(laboratory)}>
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
  laboratories: storeState.laboratorie.laboratories,
  laboratory: storeState.laboratorie.laboratory,
  page: storeState.laboratorie.page,
  size: storeState.laboratorie.size,
  total: storeState.laboratorie.total,
  visible: storeState.laboratorie.visible,
  keyword: storeState.laboratorie.keyword
});

const mapDispatchToProps = {
  setVisible,
  getLaboratories,
  createLaboratory,
  deleteLaboratory,
  setLaboratory
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Laboratories);
