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

    @Autowired
    public StuTeachService(StuTeachMapper mapper)
    {
        this.mapper = mapper;
    }

    public ImmutableMap<String, Object> getWithKeyword(String keyword, Integer page, Integer size)
    {
        Page page1 = PageHelper.startPage(page, size, true);
        Object list = mapper.selectWithKeyword(keyword);

        return ImmutableMap.of("total", page1.getTotal(),
            "list", list,
            "page", page,
            "size", size);
    }

    public StuTeachDo getById(Integer id)
    {
        return mapper.selectByPrimaryKey(id);
    }

    public Boolean add(StuTeachDo record)
    {
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

    public Boolean delete(Integer id)
    {
        return mapper.deleteByPrimaryKey(id) == 1;
    }
}
