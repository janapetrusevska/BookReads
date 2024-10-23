package com.books.bookreads.service;

import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.dtos.BookDtoRequest;
import com.books.bookreads.model.enums.BookStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BookService{
    List<BookDto> findAll();
    List<BookDto> getBestRated();
    List<BookDto> getBooksByStatus(BookStatus status);
    BookDto findById(Long bookId);
    void addBook(BookDtoRequest bookDtoRequest, String coverPath, String jwtToken);
    BookDto updateBook(Long bookId, BookDto bookDto, String jwtToken);
    void deleteBook(Long bookId, String jwtToken);
    String saveCoverImage(MultipartFile cover) throws IOException;
}
