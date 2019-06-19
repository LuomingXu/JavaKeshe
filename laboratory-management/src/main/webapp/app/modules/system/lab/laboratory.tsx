import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Button, Divider, Drawer, Form, Input, Modal, Select, Table, Tag } from 'antd';
import {
  createLaboratory,
  deleteLaboratory,
  getEquipments,
  getLaboratories,
  setLaboratory,
  setVisible
} from 'app/modules/system/lab/laboratory.reducer';

export interface ILaboratoryState extends StateProps, DispatchProps, RouteComponentProps<{}> {}

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
    title: '地点',
    dataIndex: 'location'
  },
  {
    title: '实验设备',
    key: 'equipments',
    dataIndex: 'equipments',
    render: equipments => (
      <span>
        {equipments.map(equipment => {
          let color = equipment.name.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={equipment.id}>
              {equipment.name}
            </Tag>
          );
        })}
      </span>
    )
  },
  {
    title: '操作',
    key: 'action',
    render: (text, record) => (
      <span>
        <Button
          onClick={() => {
            props.setLaboratory(record);
            history.push(`${match.url}/detail`);
          }}
        >
          detail
        </Button>
        <Divider type="vertical" />
        <Button onClick={() => showConfirm(props.deleteLaboratory, record.id)}>delete</Button>
      </span>
    )
  }
];

function showConfirm(deleteLaboratory, id) {
  confirm({
    title: '确定要删除',
    content: 'id: ' + id,
    onOk() {
      deleteLaboratory(id);
      location.reload();
    },
    onCancel() {
      console.log('Cancel');
    }
  });
}

export class Laboratory extends React.Component<ILaboratoryState> {
  componentDidMount() {
    this.props.getLaboratories(1, 8, this.props.keyword);
    this.props.getEquipments();
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

  handleLocationChange = (value, laboratory) => {
    laboratory.location = value.target.value;
  };
  handleNumberChange = (value, laboratory) => {
    laboratory.no = value.target.value;
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
            <Form.Item label="名称" style={{ width: 400 }}>
              <Input onChange={value => this.handleNameChange(value, laboratory)} />
            </Form.Item>
            <Form.Item label="地点" style={{ width: 400 }}>
              <Input onChange={value => this.handleLocationChange(value, laboratory)} />
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
  laboratories: storeState.laboratory.laboratories,
  laboratory: storeState.laboratory.laboratory,
  page: storeState.laboratory.page,
  size: storeState.laboratory.size,
  total: storeState.laboratory.total,
  visible: storeState.laboratory.visible,
  keyword: storeState.laboratory.keyword,
  equipments: storeState.laboratory.equipments
});

const mapDispatchToProps = {
  setVisible,
  getLaboratories,
  createLaboratory,
  deleteLaboratory,
  setLaboratory,
  getEquipments
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Laboratory);
