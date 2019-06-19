/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : EquipmentService.java
 * CreateTime: 2019/06/18 13:56:28
 * LastModifiedDate : 19-6-18 下午1:56
 */

package com.syun.course.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.EquipmentDO;
import com.syun.course.repository.EquipmentMapper;
import com.syun.course.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EquipmentService
{
    private final EquipmentMapper mapper;

    @Autowired
    public EquipmentService(EquipmentMapper mapper)
    {
        this.mapper = mapper;
    }

    public  ImmutableMap<String, Object> getAll(Integer page, Integer size)
    {
        Page page1 = PageHelper.startPage(page, size, true);
        Object list = mapper.selectAll();

        return ImmutableMap.of("total", page1.getTotal(),
            "list", list,
            "page", page,
            "size", size);
    }

    public EquipmentDO searchById(Long id)
    {
        return mapper.selectByPrimaryKey(id);
    }

    public Boolean add(EquipmentDO record)
    {
        return mapper.insertSelective(record) == 1;
    }

    public Boolean delete(Long id)
    {
        return mapper.deleteByPrimaryKey(id) == 1;
    }

    public Boolean update(EquipmentDO record)
    {
        if (record.getId() == null)
        {
            throw new CustomParameterizedException("id不能为空", record.toString());
        }

        return mapper.updateByPrimaryKeySelective(record) == 1;
    }
}
