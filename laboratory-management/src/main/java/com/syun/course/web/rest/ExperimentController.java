/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : ExperimentController.java
 * CreateTime: 2019/06/18 14:15:48
 * LastModifiedDate : 19-6-18 下午2:15
 */

package com.syun.course.web.rest;

import com.syun.course.domain.ExperimentDO;
import com.syun.course.service.ExperimentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/all")
    public List<ExperimentDO> getAll()
    {
        return service.getAll();
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
