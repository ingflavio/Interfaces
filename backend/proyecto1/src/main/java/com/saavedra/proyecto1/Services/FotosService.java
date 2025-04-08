package com.saavedra.proyecto1.Services;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.FotosEntity;
import com.saavedra.proyecto1.repository.FotosRepository;
import com.saavedra.proyecto1.repository.UsuarioRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Service

public class FotosService {

        @Autowired
        private  FotosRepository fotoRepository;
        @Autowired
        private  FilStoreUtil2 fileStorageUtil;

        private final String FOTO_UPLOAD_DIR = "src/main/resources/uploads/fotos/";
        private static final int ANCHO_MINIMO = 800;
        private static final int ALTO_MINIMO = 600;

        public FotosEntity subirFoto(MultipartFile archivo, DatosDelUsuario usuario) throws IOException {
            validateFotoFile(archivo);

            String nombreArchivo = generateUniqueFilename(archivo.getOriginalFilename());
            fileStorageUtil.saveFile(archivo, FOTO_UPLOAD_DIR, nombreArchivo);

            FotosEntity foto = FotosEntity.builder()
                    .nombreArchivo(nombreArchivo)
                    .usuario(usuario)
                    .build();

            return fotoRepository.save(foto);
        }

        public List<FotosEntity> obtenerFotosPorUsuario(DatosDelUsuario usuario) {
            return fotoRepository.findByUsuario(usuario);
        }
     @Transactional
        public void eliminarFoto(Long fotoId, DatosDelUsuario usuario) throws IOException {
            FotosEntity foto = fotoRepository.findByIdAndUsuario(fotoId, usuario)
                    .orElseThrow(() -> new EntityNotFoundException("Foto no encontrada"));

            fileStorageUtil.deleteFile(FOTO_UPLOAD_DIR + foto.getNombreArchivo());
            fotoRepository.deleteByIdAndUsuario(fotoId,usuario);
        }

        public byte[] cargarFoto(String nombreArchivo) throws IOException {
            Path path = Paths.get(FOTO_UPLOAD_DIR + nombreArchivo);
            return Files.readAllBytes(path);
        }

        private void validateFotoFile(MultipartFile file) throws IOException {
            if (file == null || file.isEmpty()) {
                throw new IllegalArgumentException("El archivo de foto es requerido");
            }

            // Validar formato
            String contentType = file.getContentType();
            if (!"image/jpeg".equals(contentType) &&
                    !"image/png".equals(contentType) &&
                    !"image/webp".equals(contentType)) {
                throw new IllegalArgumentException("Solo se permiten fotos JPG, PNG o WebP");
            }

            // Validar tamaño (5MB máximo)
            if (file.getSize() > 5 * 1024 * 1024) {
                throw new IllegalArgumentException("El tamaño máximo permitido es 5MB");
            }

            // Validar dimensiones
            BufferedImage imagen = ImageIO.read(file.getInputStream());
            if (imagen == null) {
                throw new IllegalArgumentException("El archivo no es una imagen válida");
            }

            if (imagen.getWidth() < ANCHO_MINIMO || imagen.getHeight() < ALTO_MINIMO) {
                throw new IllegalArgumentException(
                        String.format("La imagen es demasiado pequeña. Dimensiones mínimas: %dx%dpx",
                                ANCHO_MINIMO, ALTO_MINIMO)
                );
            }
        }

        private String generateUniqueFilename(String originalFilename) {
            String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
            return UUID.randomUUID().toString() + extension;
        }
    }





