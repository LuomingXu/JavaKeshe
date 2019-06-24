import React from 'react';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const SystemMenuItems = (
  <>
    <DropdownItem tag={Link} to="/system/laboratory">
      <FontAwesomeIcon icon="wrench" fixedWidth /> 实验室管理
    </DropdownItem>
    <DropdownItem tag={Link} to="/system/experiment">
      <FontAwesomeIcon icon="wrench" fixedWidth /> 实验报告管理
    </DropdownItem>
    <DropdownItem tag={Link} to="/system/experiment/grade">
      <FontAwesomeIcon icon="wrench" fixedWidth /> 实验成绩管理
    </DropdownItem>
    <DropdownItem tag={Link} to="/system/laboratory/equipment">
      <FontAwesomeIcon icon="wrench" fixedWidth /> 实验设备管理
    </DropdownItem>
    <DropdownItem tag={Link} to="/system/teacher">
      <FontAwesomeIcon icon="wrench" fixedWidth /> 教师管理
    </DropdownItem>
    <DropdownItem tag={Link} to="/system/student">
      <FontAwesomeIcon icon="wrench" fixedWidth /> 学生管理
    </DropdownItem>
  </>
);

export const SystemMenu = props => (
  <NavDropdown icon="user-plus" name="system" id="system-menu">
    {SystemMenuItems}
  </NavDropdown>
);

export default SystemMenu;
