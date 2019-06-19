/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : LabController.java
 * CreateTime: 2019/06/18 14:54:09
 * LastModifiedDate : 19-6-18 下午2:54
 */

package com.syun.course.web.rest;

import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.LabDO;
import com.syun.course.service.LabService;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lab")
public class LabController
{
    private final LabService service;

    @Autowired
    public LabController(LabService service)
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
    public LabDO getById(@PathVariable Long id)
    {
        return service.searchById(id);
    }

    @ApiOperation("根据实验室id添加此实验室的设备(设备id)")
    @PostMapping("/addLabEquipment")
    public Boolean addLabEquipment(@RequestParam Long labId, @RequestBody List<Long> equipmentIds)
    {
        return service.addLabEquipment(labId, equipmentIds);
    }

    @PostMapping("/add")
    public Boolean add(@RequestBody LabDO record)
    {
        return service.add(record);
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody LabDO record)
    {
        return service.update(record);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id)
    {
        return service.delete(id);
    }
}
