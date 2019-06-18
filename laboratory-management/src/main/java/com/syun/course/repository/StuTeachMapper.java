package com.syun.course.repository;

import com.syun.course.domain.StuTeachDo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StuTeachMapper
{
    int deleteByPrimaryKey(Long id);

    int insertSelective(StuTeachDo record);

    StuTeachDo selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(StuTeachDo record);

    List<StuTeachDo> selectWithKeyword(@Param("is_del")Boolean is_del, @Param("keyword") String keyword);
}
