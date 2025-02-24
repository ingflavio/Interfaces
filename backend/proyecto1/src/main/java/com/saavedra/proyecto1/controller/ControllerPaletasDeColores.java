package com.saavedra.proyecto1.controller;

import com.saavedra.proyecto1.Services.impl.DatosDelUsuarioServicesImpl;
import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.PaletaDeColores;
import com.saavedra.proyecto1.repository.PaletaDeColoresRepository;
import com.saavedra.proyecto1.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RestController
@RequestMapping("Api/Colores")
public class ControllerPaletasDeColores {

    @Autowired
    private PaletaDeColoresRepository paletaDeColoresRepository;
    @Autowired
    private UsuarioRepository usuarioRepository1;


    @GetMapping("/Obtener")
    public ResponseEntity<?> obtenerColores(@RequestParam("Nombrepaleta") String Nombrepaleta) {
        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String authUsername = authentication.getName();

            Optional<DatosDelUsuario> usuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);
            if (!usuarioEntity.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND); // 404
            }

            Long idUsuario = usuarioEntity.get().getId();
            System.out.println("Buscando paleta con NombrePaleta: " + Nombrepaleta + " y usuarioId: " + idUsuario);
            Optional<PaletaDeColores> paletaDeColores = paletaDeColoresRepository.findByPerfilColores(Nombrepaleta, idUsuario);
            System.out.println(paletaDeColores.get());
            if (!paletaDeColores.isPresent()) {
                return new ResponseEntity<>("Paleta No Encontrada", HttpStatus.NOT_FOUND); // 404
            }

            return ResponseEntity.ok(paletaDeColores.get());

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }


    @PostMapping("/Crear")
    public ResponseEntity<?> CrearColores(@RequestBody PaletaDeColores NuevaPaleta) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String authUsername = authentication.getName();

            Optional<DatosDelUsuario> usuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);
            if (!usuarioEntity.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND); // 404
            }
            Long idUsuario = usuarioEntity.get().getId();

            if (NuevaPaleta.getNombrePaleta().equalsIgnoreCase("Predeterminado")) {
                return new ResponseEntity<>("No se puede crear o editar la paleta Predeterminado", HttpStatus.BAD_REQUEST); // 400
            }

            Optional<PaletaDeColores> paletaDeColores = paletaDeColoresRepository.findByPerfilColores(NuevaPaleta.getNombrePaleta(), idUsuario);
            if (paletaDeColores.isPresent()) {
                return new ResponseEntity<>("Ya existe una paleta con este nombre", HttpStatus.CONFLICT); // 409
            }

            NuevaPaleta.setDatosDelUsuario(usuarioEntity.get());
            paletaDeColoresRepository.save(NuevaPaleta);

            return ResponseEntity.ok(NuevaPaleta);

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }
    @DeleteMapping("/Eliminar")
    public ResponseEntity<?> BorrarPaleta(@RequestParam("Nombrepaleta") String Nombrepaleta) {

        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String authUsername = authentication.getName();

            Optional<DatosDelUsuario> usuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);
            if (!usuarioEntity.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND); // 404
            }
            Long idUsuario = usuarioEntity.get().getId();


            if (Nombrepaleta.equalsIgnoreCase("Predeterminado")) {
                return new ResponseEntity<>("No se puede eliminar o editar la paleta Predeterminado", HttpStatus.BAD_REQUEST); // 400
            }


            Optional<PaletaDeColores> paletaDeColores = paletaDeColoresRepository.findByPerfilColores(Nombrepaleta, idUsuario);
            if (!paletaDeColores.isPresent() && Nombrepaleta == "Predeterminado") {
                return new ResponseEntity<>("No se puede Borrar la paleta Predeterminado", HttpStatus.NOT_FOUND); // 404
            }

            paletaDeColoresRepository.delete(paletaDeColores.get());
            return ResponseEntity.ok(paletaDeColores.get());

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }

    @PostMapping("/Activar")
    public ResponseEntity<?> activarPaleta(@RequestParam("Nombrepaleta") String Nombrepaleta) {
        try {
            // Obtener el usuario autenticado
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String authUsername = authentication.getName();

            // Buscar el usuario en la base de datos
            Optional<DatosDelUsuario> usuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);
            if (!usuarioEntity.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND); // 404
            }

            Long idUsuario = usuarioEntity.get().getId();

            // Buscar la paleta activa actual del usuario
            Optional<PaletaDeColores> paletaActivaActual = paletaDeColoresRepository.findByUsuarioIdAndActiva(idUsuario, true);
            if (paletaActivaActual.isPresent()) {
                // Desactivar la paleta activa actual
                PaletaDeColores paletaDesactivar = paletaActivaActual.get();
                paletaDesactivar.setActiva(false);
                paletaDeColoresRepository.save(paletaDesactivar);
            }

            // Buscar la paleta que se desea activar
            Optional<PaletaDeColores> paletaParaActivar = paletaDeColoresRepository.findByPerfilColores(Nombrepaleta, idUsuario);
            if (!paletaParaActivar.isPresent()) {
                return new ResponseEntity<>("Paleta no encontrada", HttpStatus.NOT_FOUND); // 404
            }

            // Activar la nueva paleta
            PaletaDeColores paletaActivada = paletaParaActivar.get();
            paletaActivada.setActiva(true);
            paletaDeColoresRepository.save(paletaActivada);

            return ResponseEntity.ok("Paleta '" + Nombrepaleta + "' activada correctamente");

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }

    @GetMapping("/ObtenerActiva")
    public ResponseEntity<?> obtenerPaletaActiva() {
        try {
            // Obtener el usuario autenticado
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String authUsername = authentication.getName();

            // Buscar el usuario en la base de datos
            Optional<DatosDelUsuario> usuarioEntity = usuarioRepository1.findByNombreDeUsuario(authUsername);
            if (!usuarioEntity.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND); // 404
            }

            Long idUsuario = usuarioEntity.get().getId();
            // Buscar la paleta activa del usuario
            Optional<PaletaDeColores> paletaActiva = paletaDeColoresRepository.findByUsuarioIdAndActiva(idUsuario, true);
            if (!paletaActiva.isPresent()) {
                return new ResponseEntity<>("No hay paleta activa", HttpStatus.NOT_FOUND); // 404
            }

            // Retornar la paleta activa
            return ResponseEntity.ok(paletaActiva.get());

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno del servidor: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR); // 500
        }
    }


}