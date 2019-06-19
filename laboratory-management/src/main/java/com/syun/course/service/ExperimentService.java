/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : ExperimentService.java
 * CreateTime: 2019/06/18 14:17:28
 * LastModifiedDate : 19-6-18 下午2:17
 */

package com.syun.course.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.ExperimentDO;
import com.syun.course.domain.GradeDO;
import com.syun.course.domain.StuTeachDo;
import com.syun.course.repository.ExperimentMapper;
import com.syun.course.repository.StuTeachMapper;
import com.syun.course.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperimentService
{
    private final ExperimentMapper mapper;
    private final StuTeachMapper stuTeachMapper;
    private final GradeService gradeService;

    @Autowired
    public ExperimentService(ExperimentMapper mapper, StuTeachMapper stuTeachMapper, GradeService gradeService)
    {
        this.mapper = mapper;
        this.stuTeachMapper = stuTeachMapper;
        this.gradeService = gradeService;
    }

    public ImmutableMap<String, Object> getAll(Integer page, Integer size)
    {
        Page page1 = PageHelper.startPage(page, size, true);
        Object list = mapper.selectAll();

        return ImmutableMap.of("total", page1.getTotal(),
            "list", list,
            "page", page,
            "size", size);
    }

    public ExperimentDO searchById(Long id)
    {
        return mapper.selectByPrimaryKey(id);
    }

    public ImmutableMap<String, Object> getAllWithStudent(Integer page, Integer size)
    {
        Page page1 = PageHelper.startPage(page, size, true);
        Object list = mapper.selectAllWithStudent();

        return ImmutableMap.of("total", page1.getTotal(),
            "list", list,
            "page", page,
            "size", size);
    }

    public ExperimentDO searchByIdWithStudent(Long id)
    {
        ExperimentDO record = mapper.selectByPrimaryKeyWithStudent(id);

        if (record.getStudents() != null && record.getStudents().size() > 0)
        {
            List<StuTeachDo> students = record.getStudents();
            List<GradeDO> grades = gradeService.getByExperimentNo(record.getNo());

            if (grades!=null)
            {
                for (GradeDO grade : grades)
                {
                    for (StuTeachDo student : students)
                    {
                        if (grade.getStudentNo().equals(student.getNumber()))
                        {
                            student.setGrade(grade.getGrade());
                        }
                    }
                }
            }
        }

        return record;
    }

    public Boolean add(ExperimentDO record)
    {
        return mapper.insertSelective(record) == 1;
    }

    public Boolean addExperimentStudent(Long experimentId, List<Long> stuIds)
    {
        stuIds.removeIf(id -> mapper.isExist(experimentId, id) != null);

        if (stuIds.size() < 1)
        {
            return true;
        }

        GradeDO gradeDO;
        for (Long stuId : stuIds)
        {
            gradeDO = new GradeDO();
            gradeDO.setExperimentNo(mapper.selectByPrimaryKey(experimentId).getNo());
            gradeDO.setStudentNo(stuTeachMapper.selectByPrimaryKey(stuId).getNumber());
            gradeDO.setGrade(0);

            gradeService.add(gradeDO);
        }

        return mapper.insertExperimentStudent(experimentId, stuIds) == stuIds.size();
    }

    public Boolean update(ExperimentDO record)
    {
        if (record.getId() == null)
        {
            throw new CustomParameterizedException("id不能为空", record.toString());
        }

        return mapper.updateByPrimaryKeySelective(record) == 1;
    }

    public Boolean delete(Long id)
    {
        return mapper.deleteByPrimaryKey(id) == 1;
    }
}
