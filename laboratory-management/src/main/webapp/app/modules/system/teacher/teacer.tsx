import React from 'react'
import {getSession} from "app/shared/reducers/authentication";
import {connect} from "react-redux";
import {RouteComponentProps} from "react-router";
import {Button, Divider, Drawer, Input, Modal, Select, Table} from "antd";
import {setVisible} from "app/modules/system/teacher/teacher.reducer";

export interface ITeacher extends StateProps, DispatchProps, RouteComponentProps<{}> {
}


const confirm = Modal.confirm;
const Search = Input.Search;

const {Option} = Select;


const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
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
        width: '10%',
    },
    {
        title: '姓名',
        dataIndex: 'name',
        width: '10%',
    },
    {
        title: '院系',
        dataIndex: 'department',
    },
    {
        title: '操作',
        key: 'action',
        render: (text, record) => (
            <span>
                <Button onClick={() => {
                    props.changeStatus(false);
                    props.setStudent(record);
                    history.push(`${match.url}/detail`);
                }}> detail</Button>
            <Divider type="vertical"/>
                <Button onClick={() => showConfirm(props.deleteStudent, record.id)}>delete</Button>
            </span>
        )
    }
];


function showConfirm(deleteStudent, id) {
    confirm({
        title: '确定要删除',
        content: 'id: ' + id,
        onOk() {
            deleteStudent(id)
        },
        onCancel() {
            console.log('Cancel');
        },
    });
}


export class Teacher extends React.Component<ITeacher> {
    showDrawer = () => {
        this.props.setVisible(true);
    };

    onClose = () => {
        this.props.setVisible(false);
    };

    render() {

        const {match,history,account,teachers,teacher,size,page,total,visible} = this.props;

        const pagination = {
            pageSize: size,
            current: page,
            total: total
        };

        return (
            <div>
                <Search placeholder="input search text" onSearch={(value) =>{}} style={{width: 200}}/>
                <Button type="primary" size={"default"} style={{float: 'right'}} onClick={() => {this.showDrawer();}}>创建</Button>
                <Table
                    columns={columns(match, history, this.props)}
                    rowKey={account.login}
                    dataSource={teachers}
                    pagination={pagination}
                    // onChange={this.handlePageChange}
                />
                <Drawer
                    title="Basic Drawer"
                    placement="right"
                    width={500}
                    closable={false}
                    onClose={this.onClose}
                    visible={visible}
                >
                </Drawer>


            </div>
        );
    }

}


const mapStateToProps = storeState => ({
    account: storeState.authentication.account,
    teachers:storeState.teacher.teachers,
    teacher:storeState.teacher.teacher,
    page: storeState.teacher.page,
    size: storeState.teacher.size,
    total: storeState.teacher.total,
    visible: storeState.teacher.visible,
    keyword: storeState.teacher.keyword
});

const mapDispatchToProps = {
    setVisible
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teacher);
