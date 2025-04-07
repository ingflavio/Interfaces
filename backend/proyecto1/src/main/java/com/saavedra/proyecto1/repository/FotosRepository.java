package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.FormacionAcademicaEntity;
import com.saavedra.proyecto1.entity.FotosEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FotosRepository extends CrudRepository<FotosEntity,Long> {

    List<FotosEntity> findByUsuario(DatosDelUsuario usuario);
    Optional<FotosEntity> findByIdAndUsuario(Long id, DatosDelUsuario usuario);

}
