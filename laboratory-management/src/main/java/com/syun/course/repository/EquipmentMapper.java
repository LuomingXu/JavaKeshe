/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : EquipmentMapper.java
 * CreateTime: 2019/06/18 13:53:22
 * LastModifiedDate : 19-6-18 下午1:51
 */

package com.syun.course.repository;

import com.syun.course.domain.EquipmentDO;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EquipmentMapper {
    int deleteByPrimaryKey(Long id);

    int insertSelective(EquipmentDO record);

    List<EquipmentDO> selectAll();

    EquipmentDO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(EquipmentDO record);
}
