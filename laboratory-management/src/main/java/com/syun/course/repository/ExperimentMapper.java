/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : ExperimentMapper.java
 * CreateTime: 2019/06/18 14:14:41
 * LastModifiedDate : 19-6-18 下午2:13
 */

package com.syun.course.repository;

import com.syun.course.domain.ExperimentDO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExperimentMapper
{
    int deleteByPrimaryKey(Long id);

    int insertSelective(ExperimentDO record);

    int insertExperimentStudent
        (
            @Param("experimentId") Long experimentId,
            @Param("stuIds") List<Long> stuIds
        );

    ExperimentDO selectByPrimaryKey(Long id);

    List<ExperimentDO> selectAll();

    ExperimentDO selectByPrimaryKeyWithStudent(Long id);

    List<ExperimentDO> selectAllWithStudent();

    int updateByPrimaryKeySelective(ExperimentDO record);
}
