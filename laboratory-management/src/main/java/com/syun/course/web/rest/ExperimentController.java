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
import io.swagger.annotations.ApiOperation;
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

    @GetMapping("/all/{page}/{size}")
    public ImmutableMap<String, Object> getAll(@PathVariable Integer page, @PathVariable Integer size)
    {
        return service.getAll(page, size);
    }

    // 在主页面初次渲染时就获取所有相关信息，避免之后重查
    @ApiOperation("包含了参与这个实验的学生List")
    @GetMapping("/all/withStudent/{page}/{size}")
    public ImmutableMap<String, Object> getAllWithStudent
        (
            @PathVariable Integer page,
            @PathVariable Integer size
        )
    {
        return service.getAllWithStudent(page, size);
    }

    @GetMapping("/{id}")
    public ExperimentDO getById(@PathVariable Long id)
    {
        return service.searchById(id);
    }

    @ApiOperation("包含了参与这个实验的学生List")
    @GetMapping("/{id}/withStudent")
    public ExperimentDO getByIdWithStudent(@PathVariable Long id)
    {
        return service.searchByIdWithStudent(id);
    }

    @PostMapping("/add")
    public Boolean add(@RequestBody ExperimentDO record)
    {
        return service.add(record);
    }

    @PostMapping("/addExperimentStudent")
    public Boolean addExperimentStudent(@RequestParam Long experimentId, @RequestBody List<Long> stuIds)
    {
        return service.addExperimentStudent(experimentId, stuIds);
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody ExperimentDO record)
    {
        return service.update(record);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id)
    {
        return service.delete(id);
    }
}
