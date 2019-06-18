/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : ExperimentDO.java
 * CreateTime: 2019/06/18 14:18:15
 * LastModifiedDate : 19-6-18 下午2:13
 */

package com.syun.course.domain;

import javax.persistence.Transient;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * experiment
 *
 * @author
 */
public class ExperimentDO
{
    private Long id;

    /**
     * 实验编号
     */
    private String no;

    /**
     * 指导教师
     */
    private String teacher;

    /**
     * 实验教室
     */
    private String location;

    /**
     * 实验名称
     */
    private String name;

    /**
     * 实验内容
     */
    private String content;

    /**
     * 实验时间
     */
    private Date date;

    @Transient
    private List<StuTeachDo> students;

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getNo()
    {
        return no;
    }

    public void setNo(String no)
    {
        this.no = no;
    }

    public String getTeacher()
    {
        return teacher;
    }

    public void setTeacher(String teacher)
    {
        this.teacher = teacher;
    }

    public String getLocation()
    {
        return location;
    }

    public void setLocation(String location)
    {
        this.location = location;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getContent()
    {
        return content;
    }

    public void setContent(String content)
    {
        this.content = content;
    }

    public Date getDate()
    {
        return date;
    }

    public void setDate(Date date)
    {
        this.date = date;
    }

    public List<StuTeachDo> getStudents()
    {
        return students;
    }

    public void setStudents(List<StuTeachDo> students)
    {
        this.students = students;
    }

    @Override
    public String toString()
    {
        return "ExperimentDO{" +
            "id=" + id +
            ", no='" + no + '\'' +
            ", teacher='" + teacher + '\'' +
            ", location='" + location + '\'' +
            ", name='" + name + '\'' +
            ", content='" + content + '\'' +
            ", date=" + date +
            ", students=" + students +
            '}';
    }
}
