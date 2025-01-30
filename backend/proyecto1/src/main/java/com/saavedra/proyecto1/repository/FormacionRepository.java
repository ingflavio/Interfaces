package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.FormacionAcademicaEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FormacionRepository extends CrudRepository<FormacionAcademicaEntity,Long> {
}
