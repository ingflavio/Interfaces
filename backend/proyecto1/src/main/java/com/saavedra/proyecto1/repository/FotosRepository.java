package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.FormacionAcademicaEntity;
import com.saavedra.proyecto1.entity.FotosEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FotosRepository extends CrudRepository<FotosEntity,Long> {

    List<FotosEntity> findByUsuario(DatosDelUsuario usuario);
    Optional<FotosEntity> findByIdAndUsuario(Long id, DatosDelUsuario usuario);

    @Modifying
    @Query("DELETE FROM FotosEntity f WHERE f.id = :id AND f.usuario = :usuario")
    void deleteByIdAndUsuario(@Param("id") Long id, @Param("usuario") DatosDelUsuario usuario);

}
