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
import com.syun.course.web.rest.errors.CustomParameterizedException;
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
    public Boolean add(@RequestBody List<GradeDO> records)
    {
        int count = 0;
        for (GradeDO record : records)
        {
            if (service.add(record))
            {
                count++;
            }
            else
                throw new CustomParameterizedException("此数据插入失败", record.toString());
        }

        return count == records.size();
    }

    @PostMapping("/update")
    public Boolean update(@RequestBody List<GradeDO> records)
    {
        return service.update(records);
    }

    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Long id)
    {
        return service.delete(id);
    }
}
