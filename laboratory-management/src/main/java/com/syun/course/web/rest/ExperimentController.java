/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : ExperimentController.java
 * CreateTime: 2019/06/18 14:15:48
 * LastModifiedDate : 19-6-18 下午2:15
 */

package com.syun.course.web.rest;

import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.ExperimentDO;
import com.syun.course.service.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/experiment")
public class ExperimentController
{
    private final ExperimentService service;

    @Autowired
    public ExperimentController(ExperimentService service)
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
        return service.getAll(page,size);
    }

    @GetMapping("/{id}")
    public ExperimentDO getById(@PathVariable Long id)
    {
        return service.searchById(id);
    }

    @PostMapping("/add")
    public Boolean add(@RequestBody ExperimentDO record)
    {
        return service.add(record);
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody ExperimentDO record)
    {
        return service.update(record);
    }
}
