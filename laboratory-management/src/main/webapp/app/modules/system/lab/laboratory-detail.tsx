import React from 'react';
import {
  createLaboratory,
  deleteLaboratory,
  getLaboratories,
  setVisible,
  updateLaboratory
} from 'app/modules/system/lab/laboratory.reducer';
import { connect } from 'react-redux';
import { Button, Form, Input, Modal } from 'antd';
import { RouteComponentProps } from 'react-router';

export interface ILaboratoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{}> {}

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

export class LaboratoryDetail extends React.Component<ILaboratoryDetailProps> {
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
    this.props.history.push('/system/laboratory');
    this.props.getLaboratories(1, 8, this.props.keyword);
  };

  render() {
    const { laboratory } = this.props;
    return (
      <div>
        <Form {...formItemLayout}>
          <Form.Item label="编号" style={{ width: 400 }}>
            <Input defaultValue={laboratory.number} onChange={value => this.handleNumberChange(value, laboratory)} />
          </Form.Item>
          <Form.Item label="姓名" style={{ width: 400 }}>
            <Input defaultValue={laboratory.name} onChange={value => this.handleNameChange(value, laboratory)} />
          </Form.Item>
          <Form.Item label="学院" style={{ width: 400 }}>
            <Input defaultValue={laboratory.department} onChange={value => this.handleDeptChange(value, laboratory)} />
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
  keyword: storeState.laboratory.keyword
});

const mapDispatchToProps = {
  setVisible,
  getLaboratories,
  createLaboratory,
  deleteLaboratory,
  updateLaboratory
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LaboratoryDetail);
