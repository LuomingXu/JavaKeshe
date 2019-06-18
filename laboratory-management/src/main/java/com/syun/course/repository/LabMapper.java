/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : LabMapper.java
 * CreateTime: 2019/06/18 14:52:38
 * LastModifiedDate : 19-6-18 下午2:52
 */

package com.syun.course.repository;

import com.syun.course.domain.LabDO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LabMapper {
    int deleteByPrimaryKey(Long id);

    int insertLabEquipment(@Param("labId") Long labId, @Param("equipmentId") Long equipmentId);

    int insertSelective(LabDO record);

    List<LabDO> selectAll();

    LabDO selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(LabDO record);
}
