package com.saavedra.proyecto1.controller;

import com.saavedra.proyecto1.Services.FotosService;
import com.saavedra.proyecto1.Services.impl.DatosDelUsuarioServicesImpl;
import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.FotosEntity;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/Api/Fotos")
@RequiredArgsConstructor
public class ControllerFotos {

    private final FotosService fotoService;
    private final DatosDelUsuarioServicesImpl usuarioService;

    @PostMapping("/Subir")
    public ResponseEntity<?> subirFoto(@RequestParam("foto") MultipartFile archivo) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioService.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            FotosEntity foto = fotoService.subirFoto(archivo, usuario.get());
            return ResponseEntity.ok(foto);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body("Error al procesar la foto: " + e.getMessage());
        }
    }

    @GetMapping("/ObtenerTodos")
    public ResponseEntity<?> obtenerFotosUsuario() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioService.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            List<FotosEntity> fotos = fotoService.obtenerFotosPorUsuario(usuario.get());

            List<Map<String, Object>> response = fotos.stream().map(foto -> {
                Map<String, Object> fotoData = new LinkedHashMap<>();
                fotoData.put("id", foto.getId());
                fotoData.put("nombreArchivo", foto.getNombreArchivo());
                fotoData.put("url", "/Api/Fotos/ver/" + foto.getNombreArchivo());
                return fotoData;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error al obtener las fotos: " + e.getMessage());
        }
    }

    @DeleteMapping("/Eliminar/{id}")
    public ResponseEntity<?> eliminarFoto(@PathVariable Long id) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioService.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuario no encontrado");
            }

            fotoService.eliminarFoto(id, usuario.get());
            return ResponseEntity.ok("Foto eliminada correctamente");

        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.internalServerError()
                    .body("Error al eliminar la foto: " + e.getMessage());
        }
    }

    @GetMapping("/ver/{nombreArchivo}")
    public ResponseEntity<?> verFoto(@PathVariable String nombreArchivo) {
        try {
            byte[] imagenBytes = fotoService.cargarFoto(nombreArchivo);

            String extension = nombreArchivo.substring(nombreArchivo.lastIndexOf(".") + 1).toLowerCase();
            MediaType mediaType;

            switch (extension) {
                case "jpg":
                case "jpeg":
                    mediaType = MediaType.IMAGE_JPEG;
                    break;
                case "png":
                    mediaType = MediaType.IMAGE_PNG;
                    break;
                case "webp":
                    mediaType = MediaType.valueOf("image/webp");
                    break;
                default:
                    throw new IllegalArgumentException("Formato no soportado");
            }

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(imagenBytes);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Foto no encontrada");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}














