package com.saavedra.proyecto1.Services;

import com.saavedra.proyecto1.entity.DatosDelUsuario;
import com.saavedra.proyecto1.entity.VideoEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
@Service
public interface VideoServices {


    VideoEntity uploadVideo(String titulo, String descripcion,
                            MultipartFile videoFile,
                            MultipartFile subtitulosEs,
                            MultipartFile subtitulosEn,
                            DatosDelUsuario usuario) throws IOException;

    List<VideoEntity> getAllVideosByUser(DatosDelUsuario usuario);

    Optional<VideoEntity> getVideoByIdAndUser(Long videoId, DatosDelUsuario usuario);

    void deleteVideo(Long videoId, DatosDelUsuario usuario) throws IOException;

    Optional<VideoEntity> findByNombreArchivo(String nombreArchivo);

    List<String> getAllVideoNamesByUser(DatosDelUsuario usuario);













}
