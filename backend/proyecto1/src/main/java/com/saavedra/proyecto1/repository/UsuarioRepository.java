package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface UsuarioRepository extends CrudRepository<DatosDelUsuario, Long> {

    @Query("SELECT u FROM DatosDelUsuario u WHERE u.NombreDeUsuario = :NombreDeUsuario")
    Optional<DatosDelUsuario> findByNombreDeUsuario(@Param("NombreDeUsuario") String nombreDeUsuario);
}


