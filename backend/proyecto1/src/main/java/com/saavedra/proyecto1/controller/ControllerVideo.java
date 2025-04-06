package com.saavedra.proyecto1.controller;



import com.saavedra.proyecto1.Services.VideoNotFoundException;
import com.saavedra.proyecto1.Services.VideoServices;
import com.saavedra.proyecto1.Services.impl.DatosDelUsuarioServicesImpl;
import com.saavedra.proyecto1.Services.impl.VideoEntityServicesImpl;
import com.saavedra.proyecto1.entity.DatosDelUsuario;

import com.saavedra.proyecto1.entity.VideoEntity;

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
@RequestMapping("/Api/Videos")
@RequiredArgsConstructor
public class ControllerVideo {
    @Autowired
    private VideoEntityServicesImpl videoService;
    @Autowired
    private DatosDelUsuarioServicesImpl usuarioRepository;

    // Subir un nuevo video con subtítulos
    @PostMapping("/Subir")
    public ResponseEntity<?> subirVideo(
            @RequestParam("titulo") String titulo,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("video") MultipartFile videoFile,
            @RequestParam("subtitulosEs") MultipartFile subtitulosEs,
            @RequestParam("subtitulosEn") MultipartFile subtitulosEn) {

        try {
            // Validar tamaño antes de procesar
            if (videoFile.getSize() > 50 * 1024 * 1024) { // 50 MB
                return ResponseEntity
                        .status(HttpStatus.PAYLOAD_TOO_LARGE)
                        .body("El video no debe exceder los 50 MB");
            }

            // Validar subtítulos
            if (subtitulosEs.getSize() > 5 * 1024 * 1024 || // 1 MB para subtítulos
                    subtitulosEn.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity
                        .badRequest()
                        .body("Los archivos de subtítulos no deben exceder 1 MB");
            }

            // Resto de tu lógica actual...
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioRepository.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            VideoEntity video = videoService.uploadVideo(
                    titulo,
                    descripcion,
                    videoFile,
                    subtitulosEs,
                    subtitulosEn,
                    usuario.get()
            );

            return ResponseEntity.ok(video);

        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity
                    .internalServerError()
                    .body("Error al procesar los archivos: " + e.getMessage());
        }
    }
    // Obtener todos los videos del usuario (para carrusel)
    @GetMapping("/ObtenerTodos")
    public ResponseEntity<?> obtenerVideosUsuario() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioRepository.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            List<VideoEntity> videos = videoService.getAllVideosByUser(usuario.get());

            // Convertir a DTO con URLs
            List<Map<String, String>> response = videos.stream().map(video -> {
                Map<String, String> videoData = new LinkedHashMap<>();
                videoData.put("id", video.getId().toString());
                videoData.put("titulo", video.getTitulo());
                videoData.put("descripcion", video.getDescripcion());
                videoData.put("videoUrl", "/Api/Videos/video/" + video.getNombreArchivo());
                videoData.put("subtituloEspanolUrl", "/Api/Videos/subtitulo/" + video.getSubtitulosEs());
                videoData.put("subtituloInglesUrl", "/Api/Videos/subtitulo/" + video.getSubtitulosEn());
                return videoData;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Eliminar un video por ID
    @DeleteMapping("/Eliminar")
    public ResponseEntity<?> eliminarVideo(@RequestParam("idVideo") Long idVideo) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioRepository.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            videoService.deleteVideo(idVideo, usuario.get());
            return ResponseEntity.ok("Video eliminado correctamente");

        } catch (VideoNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (IOException e) {
            return new ResponseEntity<>("Error al eliminar archivos: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("/video/{filename}")
    public ResponseEntity<?> getVideoFile(@PathVariable String filename) {
        try {
            // Validar que el video pertenezca al usuario (opcional)
            byte[] videoBytes = videoService.loadVideoFile(filename);

            String extension = filename.substring(filename.lastIndexOf("."));
            MediaType mediaType = switch (extension.toLowerCase()) {
                case ".mp4" -> MediaType.valueOf("video/mp4");
                case ".webm" -> MediaType.valueOf("video/webm");
                default -> throw new IllegalArgumentException("Formato no soportado");
            };

            return ResponseEntity.ok()
                    .contentType(mediaType)
                    .body(videoBytes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Video no encontrado");
        }
    }

    @GetMapping("/subtitulo/{filename}")
    public ResponseEntity<?> getSubtitleFile(@PathVariable String filename) {
        try {
            byte[] subtitleBytes = videoService.loadSubtitleFile(filename);
            return ResponseEntity.ok()
                    .contentType(MediaType.TEXT_PLAIN)
                    .body(subtitleBytes);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }


















    // Obtener un video por nombre de archivo
    @GetMapping("/ObtenerPorNombre")
    public ResponseEntity<?> obtenerVideoPorNombre(@RequestParam("nombreArchivo") String nombreArchivo) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String username = authentication.getName();
            Optional<DatosDelUsuario> usuario = usuarioRepository.findByNombreDeUsuario(username);

            if (!usuario.isPresent()) {
                return new ResponseEntity<>("Usuario no encontrado", HttpStatus.NOT_FOUND);
            }

            Optional<VideoEntity> video = videoService.findByNombreArchivo(nombreArchivo);
            if (!video.isPresent() || !video.get().getUsuario().getId().equals(usuario.get().getId())) {
                return new ResponseEntity<>("Video no encontrado", HttpStatus.NOT_FOUND);
            }

            return ResponseEntity.ok(video.get());

        } catch (Exception e) {
            return new ResponseEntity<>("Error interno: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}