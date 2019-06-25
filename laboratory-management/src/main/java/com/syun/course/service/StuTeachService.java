/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : StuTeachService.java
 * CreateTime: 2019/06/17 14:37:40
 * LastModifiedDate : 19-6-17 下午2:37
 */

package com.syun.course.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.StuTeachDo;
import com.syun.course.repository.StuTeachMapper;
import com.syun.course.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StuTeachService
{
    private final StuTeachMapper mapper;

    private final GradeService gradeService;
    private final ExperimentService experimentService;

    @Autowired
    public StuTeachService(StuTeachMapper mapper, GradeService gradeService, ExperimentService experimentService)
    {
        this.mapper = mapper;
        this.gradeService = gradeService;
        this.experimentService = experimentService;
    }

    public ImmutableMap<String, Object> getWithKeyword(Boolean is_teacher, String keyword, Integer page, Integer size)
    {
        Page page1 = PageHelper.startPage(page, size, true);
        Object list = mapper.selectWithKeyword(is_teacher, keyword);

        return ImmutableMap.of("total", page1.getTotal(),
            "list", list,
            "page", page,
            "size", size);
    }

    public StuTeachDo getById(Long id)
    {
        return mapper.selectByPrimaryKey(id);
    }

    public Boolean add(StuTeachDo record)
    {
        //判断前端传的数据是否有效
        if (record.getName().equals(""))
        {
            return false;
        }

        return mapper.insertSelective(record) == 1;
    }

    public Boolean update(StuTeachDo record)
    {
        if (record.getId() == null)
        {
            throw new CustomParameterizedException("id不能为空", record.toString());
        }

        return mapper.updateByPrimaryKeySelective(record) == 1;
    }

    /**
     * 需要删除关联的所有信息
     *
     * @param id
     * @return
     */
    public Boolean delete(Long id)
    {
        StuTeachDo stuDo = this.getById(id);

        int grade = gradeService.deleteByStudentNo(stuDo.getNumber());
        int stu = mapper.deleteByPrimaryKey(id);
        int experi = experimentService.deleteByStuId(id);

        if (grade == experi && stu == 1)
        {
            return true;
        }

        return false;
    }
}
