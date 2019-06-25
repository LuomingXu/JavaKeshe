/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : GradeMapper.java
 * CreateTime: 2019/06/18 15:16:48
 * LastModifiedDate : 19-6-18 下午3:16
 */

package com.syun.course.repository;

import com.syun.course.domain.GradeDO;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeMapper
{
    int deleteByPrimaryKey(Long id);

    int deleteByStuNo(String stuNo);

    int insertSelective(GradeDO record);

    List<GradeDO> selectByExperimentNo(@Param("experimentNo") String experimentNo);

    List<GradeDO> selectByStudentNo(@Param("studentNo") String studentNo);

    GradeDO selectByPrimaryKey(Long id);

    int updateByExperimentNoStuNo(GradeDO record);

    int updateByPrimaryKeySelective(GradeDO record);

}
