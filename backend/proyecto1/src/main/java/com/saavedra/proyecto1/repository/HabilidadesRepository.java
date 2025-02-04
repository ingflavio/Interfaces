package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.HabilidadesEntities;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabilidadesRepository  extends CrudRepository<HabilidadesEntities,Long> {
}
