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
import com.syun.course.repository.ExperimentMapper;
import com.syun.course.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ExperimentService
{
    private final ExperimentMapper mapper;

    @Autowired
    public ExperimentService(ExperimentMapper mapper)
    {
        this.mapper = mapper;
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

    public Boolean add(ExperimentDO record)
    {
        return mapper.insertSelective(record) == 1;
    }

    public Boolean update(ExperimentDO record)
    {
        if (record.getId() == null)
        {
            throw new CustomParameterizedException("id不能为空", record.toString());
        }

        return mapper.updateByPrimaryKeySelective(record) == 1;
    }
}
