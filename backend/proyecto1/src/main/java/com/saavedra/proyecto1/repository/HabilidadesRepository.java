package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.CompetenciasEntity;
import com.saavedra.proyecto1.entity.HabildadesEntities;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HabilidadesRepository  extends CrudRepository<HabildadesEntities,Long> {
}
