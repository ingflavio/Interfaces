package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.PaletaDeColores;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PaletaDeColoresRepository extends CrudRepository<PaletaDeColores,Long> {

    @Query("SELECT p FROM PaletaDeColores p WHERE p.NombrePaleta = :NombrePaleta AND p.datosDelUsuario.Id = :usuarioId")
    Optional<PaletaDeColores> findByPerfilColores(@Param("NombrePaleta") String NombrePaleta, @Param("usuarioId") Long usuarioId);

}
