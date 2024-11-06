package com.books.bookreads.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface ImageService {
    String saveCoverImage(MultipartFile cover) throws IOException;
}
