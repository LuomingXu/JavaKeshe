package com.syun.course.web.rest;

import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.StuTeachDo;
import com.syun.course.service.StuTeachService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ApiOperation("学生教师管理")
@RestController
@RequestMapping("/api/StuTeach")
public class StuTeachController
{
    private final static Logger LOG = LoggerFactory.getLogger(StuTeachController.class);

    private final StuTeachService service;
    @Autowired
    public StuTeachController(StuTeachService service)
    {
        this.service = service;
    }

    @ApiOperation("查询所有学生.")
    @GetMapping("/search/{page}/{size}")
    public ImmutableMap<String, Object> getStudent
        (
            @PathVariable("page") Integer page,
            @PathVariable("size") Integer size,
            @RequestParam(value = "keyword", required = false) String keyword
        )
    {
        LOG.info("request param page: {},size: {}, keyword: {}", page, size, keyword);

        return service.getWithKeyword(keyword, page, size);
    }

    @GetMapping("/{id}")
    public StuTeachDo get(@PathVariable("id") Integer id)
    {
        LOG.info("id: {}", id);
        return service.getById(id);
    }

    @ApiOperation("添加学生教师")
    @PostMapping("/add")
    public Boolean add(@RequestBody StuTeachDo record)
    {
        return service.add(record);
    }

    @ApiOperation("修改学生教师")
    @PostMapping("/update")
    public Boolean update(@RequestBody StuTeachDo record)
    {
        return service.update(record);
    }

    @ApiOperation("根据id删除")
    @DeleteMapping("/{id}")
    public Boolean delete(@PathVariable Integer id)
    {
        return service.delete(id);
    }
}
