/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : GradeController.java
 * CreateTime: 2019/06/18 15:27:44
 * LastModifiedDate : 19-6-18 下午3:27
 */

package com.syun.course.web.rest;

import com.syun.course.domain.GradeDO;
import com.syun.course.service.GradeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/grade")
public class GradeController
{
    private final GradeService service;

    @Autowired
    public GradeController(GradeService service)
    {
        this.service = service;
    }

    @GetMapping("/search/experimentNo")
    public List<GradeDO> searchByExperimentNo(@RequestParam String experimentNo)
    {
        return service.getByExperimentNo(experimentNo);
    }

    @GetMapping("/search/studentNo")
    public List<GradeDO> searchByStudentNo(@RequestParam String studentNo)
    {
        return service.getByStudentNo(studentNo);
    }

    @PostMapping("/add")
    public Boolean add(@RequestBody GradeDO record)
    {
        return service.add(record);
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody GradeDO record)
    {
        return service.update(record);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id)
    {
        return service.delete(id);
    }
}
