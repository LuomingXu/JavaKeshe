/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : EquipmentController.java
 * CreateTime: 2019/06/18 13:57:05
 * LastModifiedDate : 19-6-18 下午1:57
 */

package com.syun.course.web.rest;

import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.EquipmentDO;
import com.syun.course.domain.ExperimentDO;
import com.syun.course.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController
{
    private final EquipmentService service;

    @Autowired
    public EquipmentController(EquipmentService service)
    {
        this.service = service;
    }

    @GetMapping("/all/{page}/{size}")
    public ImmutableMap<String, Object> getAll
        (
            @PathVariable("page") Integer page,
            @PathVariable("size") Integer size
        )
    {
        return service.getAll(page, size);
    }

    @GetMapping("/{id}")
    public EquipmentDO getById(@PathVariable Long id)
    {
        return service.searchById(id);
    }

    @PostMapping("/add")
    public Boolean add(@RequestBody EquipmentDO record)
    {
        return service.add(record);
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody EquipmentDO record)
    {
        return service.update(record);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id)
    {
        return service.delete(id);
    }
}
