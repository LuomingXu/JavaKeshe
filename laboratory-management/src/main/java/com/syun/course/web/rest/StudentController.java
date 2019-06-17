package com.syun.course.web.rest;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.google.common.collect.ImmutableMap;
import com.syun.course.domain.Student;
import com.syun.course.repository.StudentMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/*
 * @description: 简单测试
 * @program: course
 * @author: syun
 * @create: 2019-06-16 21:13
 */
@RestController
@RequestMapping("/api/student")
public class StudentController {

    private final static Logger LOG = LoggerFactory.getLogger(StudentController.class);

    private final StudentMapper studentMapper;

    public StudentController(StudentMapper studentMapper) {
        this.studentMapper = studentMapper;
    }


    @GetMapping("/getStudents/{page}/{size}")
    public ImmutableMap<String, Object> getStudent(@PathVariable("page") Integer page,
                                                   @PathVariable("size") Integer size,
                                                   @RequestParam("keyword") String keyword) {
        LOG.info("request param page: {},size: {}, keyword: {}", page, size, keyword);
        Page page1= PageHelper.startPage(page, size, true);
        List<Student> students = studentMapper.selectAll();
        return ImmutableMap.of("total", page1.getTotal(),
            "list", students,
            "page", page,
            "size", size);
    }

    @GetMapping("/{id}")
    public Student get(@PathVariable("id") Integer id) {
        LOG.info("id: {}", id);
        return studentMapper.selectByPrimaryKey(id);
    }





}
