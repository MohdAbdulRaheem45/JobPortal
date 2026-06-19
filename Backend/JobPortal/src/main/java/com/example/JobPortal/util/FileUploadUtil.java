package com.example.JobPortal.util;


import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;


@Component
public class FileUploadUtil {

    private static final String UPLOAD_DIR = "uploads/resumes/";

    public String saveFile(MultipartFile file) throws IOException {

        if (file.isEmpty()) {
            throw new RuntimeException("File is empty");
        }

        String fileName = file.getOriginalFilename();

        if (fileName == null || !fileName.toLowerCase().endsWith(".pdf")) {
            throw new RuntimeException("Only PDF files are allowed");
        }

        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String uniqueFileName =
                UUID.randomUUID() + "_" + fileName;

        Path filePath =
                Paths.get(UPLOAD_DIR, uniqueFileName);

        file.transferTo(filePath);

        return filePath.toString();
    }
}