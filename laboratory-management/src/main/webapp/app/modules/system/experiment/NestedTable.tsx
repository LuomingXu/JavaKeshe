import { Table, Badge, Menu, Dropdown, Icon } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import get = Reflect.get;

const menu = (
  <Menu>
    <Menu.Item>Action 1</Menu.Item>
    <Menu.Item>Action 2</Menu.Item>
  </Menu>
);

const NestedTable = props => {
  const expandedRowRender = index => {
    const columns = [
      { title: 'Date', dataIndex: 'date', key: 'date' },
      { title: 'Name', dataIndex: 'name', key: 'name' },
      {
        title: 'Status',
        key: 'state',
        render: () => (
          <span>
            <Badge status="success" />
            Finished
          </span>
        )
      },
      { title: 'Upgrade Status', dataIndex: 'upgradeNum', key: 'upgradeNum' },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: () => (
          <span className="table-operation">
            <a href="javascript:;">Pause</a>
            <a href="javascript:;">Stop</a>
            <Dropdown overlay={menu}>
              <a href="javascript:;">
                More <Icon type="down" />
              </a>
            </Dropdown>
          </span>
        )
      }
    ];
    console.log('index');
    console.log(index);
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i,
        date: '2014-12-24 23:12:00',
        name: 'This is production name',
        upgradeNum: 'Upgraded: 56'
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Platform', dataIndex: 'platform', key: 'platform' },
    { title: 'Version', dataIndex: 'version', key: 'version' },
    { title: 'Upgraded', dataIndex: 'upgradeNum', key: 'upgradeNum' },
    { title: 'Creator', dataIndex: 'creator', key: 'creator' },
    { title: 'Date', dataIndex: 'createdAt', key: 'createdAt' },
    { title: 'Action', key: 'operation', render: () => <a href="javascript:;">Publish</a> }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      name: 'Screem' + i,
      platform: 'iOS',
      version: '10.3.4.5654',
      upgradeNum: 500,
      creator: 'Jack',
      createdAt: '2014-12-24 23:12:00'
    });
  }

  console.log(props.experiments);

  return (
    <Table
      className="components-table-demo-nested"
      columns={columns}
      expandedRowRender={index => expandedRowRender(index)}
      dataSource={data}
    />
  );
};

export const expandedRowRender = (record, props) => {
  let grades = [];
  record.students.map(p => {
    grades.push({
      number: p.number,
      name: p.name,
      grade: p.grade
    });
  });

  const columns = [
    { title: '学号', dataIndex: 'number', key: 'number' },
    { title: '姓名', dataIndex: 'name', key: 'name' },
    {
      title: 'Status',
      key: 'state',
      render: (text, record) => (
        <span>
          <Badge status="success" />
          {record.grade != 0 ? 'finished' : 'loading'}
        </span>
      )
    },
    { title: '成绩', dataIndex: 'grade', key: 'grade' },
    {
      title: 'Action',
      dataIndex: 'operation',
      key: 'operation',
      render: () => (
        <span className="table-operation">
          <a href="javascript:">Pause </a>
          <a href="javascript:">Stop</a>
        </span>
      )
    }
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      number: '12309779',
      name: '长子徐',
      grade: '111'
    });
  }

  return <Table columns={columns} dataSource={grades} pagination={false} />;
};

export default NestedTable;
