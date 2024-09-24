package com.books.bookreads.service.impl;

import com.books.bookreads.config.JWTService;
import com.books.bookreads.mapper.BookMapper;
import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.repository.BookRepository;
import com.books.bookreads.repository.ReaderRepository;
import com.books.bookreads.service.BookService;
import com.books.bookreads.service.ReaderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final ReaderService readerService;

    public BookServiceImpl(BookRepository bookRepository, BookMapper bookMapper, ReaderService readerService) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.readerService = readerService;
    }

    public List<BookDto> findAll() {
        return bookRepository.findAll().stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Override
    public BookDto findById(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found."));
        return bookMapper.toBookDto(book);
    }

    @Override
    public void addBook(BookDto bookDto, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Book book = bookMapper.toBookEntity(bookDto);
        book.setReader(reader);

        readerService.updateReaderPointsAndLevel(reader,(int) bookDto.getPoints());
        bookRepository.save(book);
    }

    @Override
    public BookDto updateBook(Long bookId, BookDto bookDto, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found,"));

        int pointsDifference = (int) bookDto.getPoints() - (int) book.getPoints();
        readerService.updateReaderPointsAndLevel(reader,pointsDifference);

        bookMapper.updateBookFromDto(bookDto, book);
        bookRepository.save(book);
        return bookMapper.toBookDto(book);
    }

    @Override
    public void deleteBook(Long bookId, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found,"));

        readerService.updateReaderPointsAndLevel(reader, -(int) book.getPoints());
        bookRepository.delete(book);
    }

}
