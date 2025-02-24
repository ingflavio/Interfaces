package com.saavedra.proyecto1.repository;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.PaletaDeColores;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaletaDeColoresRepository extends CrudRepository<PaletaDeColores, Long> {

    @Query("SELECT p FROM PaletaDeColores p WHERE p.NombrePaleta = :NombrePaleta AND p.datosDelUsuario.id = :usuarioId")
    Optional<PaletaDeColores> findByPerfilColores(@Param("NombrePaleta") String NombrePaleta, @Param("usuarioId") Long usuarioId);

    @Query("SELECT p FROM PaletaDeColores p WHERE p.datosDelUsuario.id = :usuarioId AND p.activa = :activa")
    Optional<PaletaDeColores> findByUsuarioIdAndActiva(@Param("usuarioId") Long usuarioId, @Param("activa") boolean activa);

    @Query("SELECT p.NombrePaleta FROM PaletaDeColores p WHERE p.datosDelUsuario.id = :usuarioId")
    List<String> findNombresPaletasByUsuarioId(@Param("usuarioId") Long usuarioId);

    // Método personalizado para eliminar una paleta por su ID
    @Modifying
    @Query("DELETE FROM PaletaDeColores p WHERE p.id = :id")
    void eliminarPaletaPorId(@Param("id") Long id);
}



