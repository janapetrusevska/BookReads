package com.books.bookreads.service.impl;

import com.books.bookreads.service.ImageService;
import jakarta.servlet.ServletContext;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class ImageServiceImpl implements ImageService {
    private final ServletContext servletContext;

    public ImageServiceImpl(ServletContext servletContext) {
        this.servletContext = servletContext;
    }

    public String saveCoverImage(MultipartFile cover) throws IOException {
        String originalFilename = cover.getOriginalFilename();
        String extension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        String uniqueFileName = UUID.randomUUID().toString() + extension;

        Path directoryPath = Paths.get("frontend/public/uploads").toAbsolutePath();
        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        Path filePath = directoryPath.resolve(uniqueFileName);
        cover.transferTo(filePath.toFile());
        return "/uploads/" + uniqueFileName;
    }
}

