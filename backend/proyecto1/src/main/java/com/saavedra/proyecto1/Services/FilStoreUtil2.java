package com.saavedra.proyecto1.Services;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class FilStoreUtil2 {

        public void saveFile(MultipartFile file, String directory, String filename) throws IOException {
            Path uploadPath = Paths.get(directory);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            Path filePath = uploadPath.resolve(filename);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        }

        public void deleteFile(String filePath) throws IOException {
            Path path = Paths.get(filePath);
            Files.deleteIfExists(path);
        }
    }

