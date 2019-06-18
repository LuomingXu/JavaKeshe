/*
 * Copyright (c) 2019
 * Author : Luoming Xu
 * Project Name : course
 * File Name : EquipmentDO.java
 * CreateTime: 2019/06/18 13:51:52
 * LastModifiedDate : 19-6-18 下午1:51
 */

package com.syun.course.domain;

/**
 * equipment
 *
 * @author
 */
public class EquipmentDO
{
    private Long id;

    /**
     * 设备名
     */
    private String name;

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    @Override
    public String toString()
    {
        StringBuilder sb = new StringBuilder();
        sb.append(getClass().getSimpleName());
        sb.append(" [");
        sb.append("Hash = ").append(hashCode());
        sb.append(", id=").append(id);
        sb.append(", name=").append(name);
        sb.append("]");
        return sb.toString();
    }
}
