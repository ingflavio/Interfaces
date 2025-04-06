package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.VideoEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface VideoRepository extends CrudRepository<VideoEntity,Long> {

    List<VideoEntity> findByUsuario(DatosDelUsuario usuario);

    Optional<VideoEntity> findByIdAndUsuario(Long id, DatosDelUsuario usuario);

    Optional<VideoEntity> findByNombreArchivo(String nombreArchivo);

    @Query("SELECT v.nombreArchivo FROM VideoEntity v WHERE v.usuario = :usuario")
    List<String> findVideoNamesByUsuario(@Param("usuario") DatosDelUsuario usuario);
}