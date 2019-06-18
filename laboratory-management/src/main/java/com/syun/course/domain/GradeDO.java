/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : GradeDO.java
 * CreateTime: 2019/06/18 16:01:26
 * LastModifiedDate : 19-6-18 下午3:16
 */

package com.syun.course.domain;

import java.io.Serializable;

/**
 * grade
 * @author 
 */
public class GradeDO {
    private Long id;

    private String studentNo;

    private String experimentNo;

    private Integer grade;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentNo() {
        return studentNo;
    }

    public void setStudentNo(String studentNo) {
        this.studentNo = studentNo;
    }

    public String getExperimentNo() {
        return experimentNo;
    }

    public void setExperimentNo(String experimentNo) {
        this.experimentNo = experimentNo;
    }

    public Integer getGrade() {
        return grade;
    }

    public void setGrade(Integer grade) {
        this.grade = grade;
    }

    @Override
    public String toString()
    {
        return "GradeDO{" +
            "id=" + id +
            ", studentNo='" + studentNo + '\'' +
            ", experimentNo='" + experimentNo + '\'' +
            ", grade=" + grade +
            '}';
    }
}
