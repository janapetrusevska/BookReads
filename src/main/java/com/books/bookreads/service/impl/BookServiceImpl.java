package com.books.bookreads.service.impl;

import com.books.bookreads.mapper.BookMapper;
import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.dtos.BookDtoRequest;
import com.books.bookreads.model.enums.BookStatus;
import com.books.bookreads.repository.BookRepository;
import com.books.bookreads.service.BookService;
import com.books.bookreads.service.ImageService;
import com.books.bookreads.service.ReaderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final ReaderService readerService;
    private final ImageService imageService;

    public BookServiceImpl(BookRepository bookRepository, BookMapper bookMapper,
                           ReaderService readerService, ImageService imageService) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.readerService = readerService;
        this.imageService = imageService;
    }

    public List<BookDto> findAllByReader(String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        return bookRepository.findAllByReaderOrderByTitleAsc(reader).stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookDto> getBestRated() {
        return bookRepository.findByStars(5).stream()
                .map(bookMapper::toBookDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BookDto> getBooksByStatusAndReader(BookStatus status, String token) {
        Reader reader = readerService.getReaderFromToken(token);
        return bookRepository.findByStatusAndReader(status, reader).stream()
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
    public void addBook(BookDtoRequest bookDtoRequest, String coverPath, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        BookDto bookDto = bookMapper.toBookDto(bookDtoRequest);
        bookDto.setCoverUrl(coverPath);
        Book book = bookMapper.toBookEntity(bookDto);
        book.setReader(reader);

        if ("READ".equalsIgnoreCase(bookDto.getStatus())) {
            readerService.updateReaderPointsAndLevel(reader, (int) bookDto.getPoints());
        }

        bookRepository.save(book);
    }

    @Override
    public BookDto updateBook(Long bookId, BookDtoRequest request, String coverPath, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found."));

        if ("READ".equalsIgnoreCase(request.getStatus()) && "READ".equalsIgnoreCase(book.getStatus().toString())) {
            int pointsDifference = (int) (request.getPoints() - book.getPoints());
            readerService.updateReaderPointsAndLevel(reader, pointsDifference);
        } else if ("READ".equalsIgnoreCase(request.getStatus())) {
            readerService.updateReaderPointsAndLevel(reader, (int) request.getPoints());
        } else if ("READ".equalsIgnoreCase(book.getStatus().toString())) {
            readerService.updateReaderPointsAndLevel(reader, (int) -book.getPoints());
        }

        bookMapper.updateBookFromDto(bookMapper.toBookDto(request), book);
        if (coverPath != null) {
            book.setCoverUrl(coverPath);
        }

        bookRepository.save(book);
        return bookMapper.toBookDto(book);
    }

    @Override
    public BookDto updateBookStatus(Long bookId, String status, String token) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found."));
        book.setStatus(BookStatus.valueOf(status));

        Reader reader = readerService.getReaderFromToken(token);
        readerService.updateReaderPointsAndLevel(reader, (int) book.getPoints());
        return bookMapper.toBookDto(book);
    }

    @Override
    public void deleteBook(Long bookId, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found."));

        if ("READ".equalsIgnoreCase(book.getStatus().toString())) {
            readerService.updateReaderPointsAndLevel(reader, -(int) book.getPoints());
        }

        bookRepository.delete(book);
    }

    @Override
    public String saveCoverImage(MultipartFile cover) throws IOException {
        return imageService.saveCoverImage(cover);
    }
}
