/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : GradeService.java
 * CreateTime: 2019/06/18 15:24:39
 * LastModifiedDate : 19-6-18 下午3:24
 */

package com.syun.course.service;

import com.syun.course.domain.GradeDO;
import com.syun.course.repository.GradeMapper;
import com.syun.course.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradeService
{
    private final GradeMapper mapper;

    @Autowired
    public GradeService(GradeMapper mapper)
    {
        this.mapper = mapper;
    }

    public List<GradeDO> getByExperimentNo(String experimentNo)
    {
        return mapper.selectByExperimentNo(experimentNo);
    }

    public List<GradeDO> getByStudentNo(String studentNo)
    {
        return mapper.selectByStudentNo(studentNo);
    }

    public Boolean add(GradeDO record)
    {
        return mapper.insertSelective(record) == 1;
    }

    public Boolean update(GradeDO record)
    {
        if (record.getStudentNo() == null || record.getStudentNo().equals(""))
        {
            throw new CustomParameterizedException("学号不能为空", record.toString());
        }

        if (record.getExperimentNo() == null || record.getExperimentNo().equals(""))
        {
            throw new CustomParameterizedException("实验编号不能为空", record.toString());
        }

        return mapper.updateByExperimentNoStuNo(record) == 1;
    }

    public Boolean delete(Long id)
    {
        return mapper.deleteByPrimaryKey(id) == 1;
    }
}
