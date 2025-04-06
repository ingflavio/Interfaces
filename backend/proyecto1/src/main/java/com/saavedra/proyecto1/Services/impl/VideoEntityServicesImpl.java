package com.saavedra.proyecto1.Services.impl;


import com.saavedra.proyecto1.Services.FileStorageUtil;
import com.saavedra.proyecto1.Services.VideoNotFoundException;
import com.saavedra.proyecto1.Services.VideoServices;
import com.saavedra.proyecto1.entity.DatosDelUsuario;

import com.saavedra.proyecto1.entity.VideoEntity;

import com.saavedra.proyecto1.repository.VideoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class VideoEntityServicesImpl implements VideoServices {

    private final VideoRepository videoRepository;
    private final FileStorageUtil fileStorageUtil;

    private final String VIDEO_UPLOAD_DIR = "src/main/resources/uploads/videos/";
    private final String SUBTITLES_UPLOAD_DIR = "src/main/resources/uploads/subtitles/";

    @Override
    public VideoEntity uploadVideo(String titulo, String descripcion,
                                   MultipartFile videoFile,
                                   MultipartFile subtitulosEs,
                                   MultipartFile subtitulosEn,
                                   DatosDelUsuario usuario) throws IOException {

        validateVideoFile(videoFile);
        validateSubtitles(subtitulosEs, subtitulosEn);

        String videoFilename = generateUniqueFilename(videoFile.getOriginalFilename());
        String subtEsFilename = generateUniqueFilename(subtitulosEs.getOriginalFilename());
        String subtEnFilename = generateUniqueFilename(subtitulosEn.getOriginalFilename());

        fileStorageUtil.saveFile(videoFile, VIDEO_UPLOAD_DIR, videoFilename);
        fileStorageUtil.saveFile(subtitulosEs, SUBTITLES_UPLOAD_DIR, subtEsFilename);
        fileStorageUtil.saveFile(subtitulosEn, SUBTITLES_UPLOAD_DIR, subtEnFilename);

        VideoEntity video = new VideoEntity();
        video.setTitulo(titulo);
        video.setDescripcion(descripcion);
        video.setNombreArchivo(videoFilename);
        video.setSubtitulosEs(subtEsFilename);
        video.setSubtitulosEn(subtEnFilename);
        video.setUsuario(usuario);

        return videoRepository.save(video);
    }

    @Override
    public List<VideoEntity> getAllVideosByUser(DatosDelUsuario usuario) {
        return videoRepository.findByUsuario(usuario);
    }

    @Override
    public Optional<VideoEntity> getVideoByIdAndUser(Long videoId, DatosDelUsuario usuario) {
        return videoRepository.findByIdAndUsuario(videoId, usuario);
    }

    @Override
    public void deleteVideo(Long videoId, DatosDelUsuario usuario) throws IOException {
        VideoEntity video = videoRepository.findByIdAndUsuario(videoId, usuario)
                .orElseThrow(() -> new VideoNotFoundException("Video no encontrado"));

        fileStorageUtil.deleteFile(VIDEO_UPLOAD_DIR + video.getNombreArchivo());
        fileStorageUtil.deleteFile(SUBTITLES_UPLOAD_DIR + video.getSubtitulosEs());
        fileStorageUtil.deleteFile(SUBTITLES_UPLOAD_DIR + video.getSubtitulosEn());

        videoRepository.delete(video);
    }

    @Override
    public Optional<VideoEntity> findByNombreArchivo(String nombreArchivo) {
        return videoRepository.findByNombreArchivo(nombreArchivo);
    }

    @Override
    public List<String> getAllVideoNamesByUser(DatosDelUsuario usuario) {
        return videoRepository.findVideoNamesByUsuario(usuario);
    }

    private void validateVideoFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("El archivo de video es requerido");
        }

        String filename = file.getOriginalFilename().toLowerCase();
        if (!filename.endsWith(".mp4") && !filename.endsWith(".webm")) {
            throw new IllegalArgumentException("Solo se permiten videos MP4 o WebM");
        }

        if (file.getSize() > 50 * 1024 * 1024) {
            throw new IllegalArgumentException("El tamaño máximo permitido es 50MB");
        }
    }

    private void validateSubtitles(MultipartFile subtEs, MultipartFile subtEn) {
        if (subtEs == null || subtEs.isEmpty() || subtEn == null || subtEn.isEmpty()) {
            throw new IllegalArgumentException("Ambos subtítulos (ES/EN) son requeridos");
        }

        validateSubtitleFile(subtEs, "Español");
        validateSubtitleFile(subtEn, "Inglés");
    }

    private void validateSubtitleFile(MultipartFile file, String language) {
        String filename = file.getOriginalFilename().toLowerCase();
        if (!filename.endsWith(".vtt") && !filename.endsWith(".srt")) {
            throw new IllegalArgumentException("Subtítulos en " + language + " deben ser .vtt o .srt");
        }
    }

    private String generateUniqueFilename(String originalFilename) {
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        return UUID.randomUUID().toString() + extension;
    }

    public byte[] loadVideoFile(String filename) throws IOException {
        Path path = Paths.get("src/main/resources/uploads/videos/" + filename);
        return Files.readAllBytes(path);
    }

    public byte[] loadSubtitleFile(String filename) throws IOException {
        Path path = Paths.get("src/main/resources/uploads/subtitles/" + filename);
        return Files.readAllBytes(path);
    }

}