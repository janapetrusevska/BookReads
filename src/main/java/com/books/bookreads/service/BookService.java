package com.books.bookreads.service;

import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.dtos.BookDtoRequest;
import com.books.bookreads.model.enums.BookStatus;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface BookService{
    List<BookDto> findAllByReader(String jwtToken);
    List<BookDto> getBestRated();
    List<BookDto> getBooksByStatusAndReader(BookStatus status, String token);
    BookDto findById(Long bookId);
    void addBook(BookDtoRequest bookDtoRequest, String coverPath, String jwtToken);
    BookDto updateBook(Long bookId, BookDtoRequest request, String coverPath, String jwtToken);
    void deleteBook(Long bookId, String jwtToken);
    String saveCoverImage(MultipartFile cover) throws IOException;
    BookDto updateBookStatus(Long bookId, String status,String token);
}
