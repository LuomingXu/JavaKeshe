import React from 'react';
import { Button, message } from 'antd';

export interface IStudentListState {
  name?: any;
  time?: any;
}

export class StudentList extends React.Component<IStudentListState> {
  state = this.props;

  componentDidMount(): void {
    this.setState({
      test: 'test',
      name: this.props.name,
      time: this.props.time
    });
  }

  handleName = () => {
    this.setState({ time: 'syun', name: 'test' });
  };

  render() {
    const { name, time } = this.state;
    return (
      <div>
        {name}
        <br />
        {time}
        <br />
        <Button onClick={this.handleName}> confirm</Button>
      </div>
    );
  }
}

export default StudentList;
