package com.syun.course.repository;

import com.syun.course.domain.StuTeachDo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StuTeachMapper
{
    int deleteByPrimaryKey(Integer id);

    int insert(StuTeachDo record);

    int insertSelective(StuTeachDo record);

    StuTeachDo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(StuTeachDo record);

    int updateByPrimaryKey(StuTeachDo record);

    List<StuTeachDo> selectWithKeyword(@Param("keyword") String keyword);
}
