import React from 'react';
import {
  addEquipments,
  createLaboratory,
  deleteLaboratory,
  getEquipments,
  getLaboratories,
  handleEquIds,
  setVisible,
  updateLaboratory
} from 'app/modules/system/lab/laboratory.reducer';
import { connect } from 'react-redux';
import { Button, Form, Input, Modal, Select } from 'antd';
import { RouteComponentProps } from 'react-router';

export interface ILaboratoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

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

export class LaboratoryDetail extends React.Component<ILaboratoryDetailProps> {
  componentDidMount(): void {
    this.props.getEquipments();
  }

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
    this.props.updateLaboratory(laboratory);
    this.handleAddStudents(this.props.equipmentId);
    this.props.history.push('/system/laboratory');
    this.props.getLaboratories(1, 8, this.props.keyword);
  };

  handleChange = (value, equipments) => {
    let ids = [];
    value.map(index => {
      ids.push(equipments[index - 1].id);
    });
    this.props.handleEquIds(ids);
  };

  handleLocationChange = (value, laboratory) => {
    laboratory.department = value.target.value;
  };

  handleAddStudents = ids => {
    this.props.addEquipments(this.props.laboratory.id, ids);
  };

  render() {
    const { laboratory, equipments } = this.props;

    const children = [];
    equipments.map(equipment => {
      children.push(<Option key={equipment.id}>{equipment.name}</Option>);
    });
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="编号" style={{ width: 400 }}>
            <Input defaultValue={laboratory.no} onChange={value => this.handleNumberChange(value, laboratory)} />
          </Form.Item>
          <Form.Item label="姓名" style={{ width: 400 }}>
            <Input defaultValue={laboratory.name} onChange={value => this.handleNameChange(value, laboratory)} />
          </Form.Item>
          <Form.Item label="地点" style={{ width: 400 }}>
            <Input defaultValue={laboratory.location} onChange={value => this.handleLocationChange(value, laboratory)} />
          </Form.Item>
          <Form.Item label="参与学生" style={{ width: 400 }}>
            <Select
              mode="multiple"
              style={{ width: '100%' }}
              placeholder="选择实验设备"
              onChange={value => this.handleChange(value, equipments)}
            >
              {children}
            </Select>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" onClick={() => this.handleSubmit(laboratory)}>
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
  laboratory: storeState.laboratory.laboratory,
  keyword: storeState.laboratory.keyword,
  equipments: storeState.laboratory.equipments,
  equipmentId: storeState.laboratory.equipmentId
});

const mapDispatchToProps = {
  setVisible,
  getLaboratories,
  createLaboratory,
  deleteLaboratory,
  updateLaboratory,
  getEquipments,
  handleEquIds,
  addEquipments
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaboratoryDetail);
