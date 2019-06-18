/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : LabDO.java
 * CreateTime: 2019/06/18 15:04:12
 * LastModifiedDate : 19-6-18 下午2:52
 */

package com.syun.course.domain;

import javax.persistence.Transient;
import java.io.Serializable;
import java.util.List;

/**
 * lab
 * @author 
 */
public class LabDO implements Serializable {
    private Long id;

    /**
     * 实验室代号
     */
    private String no;

    /**
     * 实验室名
     */
    private String name;

    /**
     * 实验室地点
     */
    private String location;

    @Transient
    private List<EquipmentDO> equipments;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNo() {
        return no;
    }

    public void setNo(String no) {
        this.no = no;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public List<EquipmentDO> getEquipments()
    {
        return equipments;
    }

    public void setEquipments(List<EquipmentDO> equipments)
    {
        this.equipments = equipments;
    }

    @Override
    public String toString()
    {
        return "LabDO{" +
            "id=" + id +
            ", no='" + no + '\'' +
            ", name='" + name + '\'' +
            ", location='" + location + '\'' +
            ", equipments=" + equipments +
            '}';
    }
}
