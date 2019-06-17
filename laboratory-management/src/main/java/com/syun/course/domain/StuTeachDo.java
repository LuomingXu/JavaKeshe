package com.syun.course.domain;

import java.util.Date;

public class StuTeachDo
{
    private Integer id;

    private String name;

    private String number;

    private Boolean sex;

    private String department;

    private String specialty;

    private String className;

    private Boolean isDel;

    private Date lastModify;

    public StuTeachDo(Integer id, String name, String number, Boolean sex, String department, String specialty, String className, Boolean isDel, Date lastModify) {
        this.id = id;
        this.name = name;
        this.number = number;
        this.sex = sex;
        this.department = department;
        this.specialty = specialty;
        this.className = className;
        this.isDel = isDel;
        this.lastModify = lastModify;
    }

    public StuTeachDo() {
        super();
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number == null ? null : number.trim();
    }

    public Boolean getSex() {
        return sex;
    }

    public void setSex(Boolean sex) {
        this.sex = sex;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department == null ? null : department.trim();
    }

    public String getSpecialty() {
        return specialty;
    }

    public void setSpecialty(String specialty) {
        this.specialty = specialty == null ? null : specialty.trim();
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className == null ? null : className.trim();
    }

    public Boolean getIsDel() {
        return isDel;
    }

    public void setIsDel(Boolean isDel) {
        this.isDel = isDel;
    }

    public Date getLastModify() {
        return lastModify;
    }

    public void setLastModify(Date lastModify) {
        this.lastModify = lastModify;
    }

    @Override
    public String toString()
    {
        return "StuTeachDo{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", number='" + number + '\'' +
            ", sex=" + sex +
            ", department='" + department + '\'' +
            ", specialty='" + specialty + '\'' +
            ", className='" + className + '\'' +
            ", isDel=" + isDel +
            ", lastModify=" + lastModify +
            '}';
    }
}
