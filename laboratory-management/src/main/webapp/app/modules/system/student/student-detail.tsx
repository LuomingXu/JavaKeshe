import React from 'react';
import {getSession} from "app/shared/reducers/authentication";
import {getStudentById, setStudent} from "app/modules/system/student/student.reducer";
import {RouteComponentProps} from "react-router";
import {connect} from "react-redux";
import {Button, Form, Input, InputNumber, Select} from "antd";

export interface IStudentProp extends StateProps, DispatchProps, RouteComponentProps<{}> {

}

const { Option } = Select;

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

const specialties = ['计算机科学与技术', '软件工程', '通信', '物联网'];



export class StudentDetail extends React.Component<IStudentProp> {

    componentDidMount() {
    }

    handleNameChange = (value, student) => {
        student.name = value.target.value;
    };

    handleAgeChange = (value,student) => {
        student.age = value;
    };
    handleGenderChange = (value,student) => {
       if(value=="male"){
           student.sex = true;
       }else {
           student.sex = false;
       }
    };
    handleDeptChange = (value,student) => {
        student.dept = value.target.value;
    };
    handleSubmit = status => {
        if(status){
            // todo 创建 stu
        }else {
            // todo 修改 stu
        }
    };
    render(){
        const { student, isCreate } = this.props;
        if(isCreate){
            student.id=null;
            student.age=0;
            student.dept='';
            student.sex=null;
            student.name = '';
            student.number = '';
        }
        return (
            <div>
                <Form {...formItemLayout}>
                    <Form.Item label="学号" style={{width: 500}} >
                        <Input disabled={true} defaultValue={student.id} style={{width: 300}}/>
                    </Form.Item>
                    <Form.Item label="姓名" style={{width: 500}}>
                        <Input defaultValue={student.name} onChange={(value)=>this.handleNameChange(value,student)}/>
                    </Form.Item>
                    <Form.Item label="性别" style={{width: 500}}>
                        <Select defaultValue={student.sex==true? "male":"female"} style={{width: 50}}  onChange={(value)=>this.handleGenderChange(value,student)}>
                            <Option value="male">男</Option>
                            <Option value="female">女</Option>
                        </Select>
                    </Form.Item>
                    {/*<Form.Item label="年龄" style={{width: 500}}>*/}
                    {/*    <InputNumber defaultValue={student.age} onChange={(value)=>this.handleAgeChange(value,student)}/>*/}
                    {/*</Form.Item>*/}
                    {/*<Form.Item label="院系" style={{width: 500}}>*/}
                    {/*    <Input defaultValue={student.dept}  onChange={(value)=>this.handleDeptChange(value,student)}/>*/}
                    {/*</Form.Item>*/}
                    <Form.Item label="专业" style={{width: 500}}>
                        <Select defaultValue={specialties[0]}
                                style={{width: 300}}
                        >
                            {specialties.map(specialty => (
                                <Option key={specialty}>{specialty}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" onClick={ ()=>this.handleSubmit(isCreate)}>
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
    isAuthenticated: storeState.authentication.isAuthenticated,
    student: storeState.student.student,
    isCreate: storeState.student.isCreate
});

const mapDispatchToProps = { getSession, getStudentById,setStudent };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(StudentDetail);

