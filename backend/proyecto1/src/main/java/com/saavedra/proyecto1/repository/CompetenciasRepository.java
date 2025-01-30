package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.CompetenciasEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompetenciasRepository extends CrudRepository<CompetenciasEntity,Long> {
}

