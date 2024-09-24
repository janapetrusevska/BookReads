package com.books.bookreads.service;

import com.books.bookreads.model.Book;
import com.books.bookreads.model.dtos.BookDto;

import java.util.List;
import java.util.Optional;

public interface BookService{
    List<BookDto> findAll();
    BookDto findById(Long bookId);
    void addBook(BookDto bookDto, String jwtToken);
    BookDto updateBook(Long bookId, BookDto bookDto, String jwtToken);
    void deleteBook(Long bookId, String jwtToken);
}
