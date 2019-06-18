/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : LabService.java
 * CreateTime: 2019/06/18 14:54:57
 * LastModifiedDate : 19-6-18 下午2:54
 */

package com.syun.course.service;

import com.syun.course.domain.LabDO;
import com.syun.course.repository.LabMapper;
import com.syun.course.web.rest.errors.CustomParameterizedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LabService
{
    private final LabMapper mapper;

    @Autowired
    public LabService(LabMapper mapper)
    {
        this.mapper = mapper;
    }

    public List<LabDO> getAll()
    {
        return mapper.selectAll();
    }

    public LabDO searchById(Long id)
    {
        return mapper.selectByPrimaryKey(id);
    }

    public Boolean addLabEquipment(Long labId, Long equipmentId)
    {
        return mapper.insertLabEquipment(labId, equipmentId) == 1;
    }

    public Boolean add(LabDO record)
    {
        return mapper.insertSelective(record) == 1;
    }

    public Boolean delete(Long id)
    {
        return mapper.deleteByPrimaryKey(id) == 1;
    }

    public Boolean update(LabDO record)
    {
        if (record.getId() == null)
        {
            throw new CustomParameterizedException("id不能为空", record.toString());
        }

        return mapper.updateByPrimaryKeySelective(record) == 1;
    }
}
