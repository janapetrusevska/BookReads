package com.books.bookreads.service.impl;

import com.books.bookreads.config.JWTService;
import com.books.bookreads.mapper.BookMapper;
import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.dtos.BookDtoRequest;
import com.books.bookreads.model.enums.BookStatus;
import com.books.bookreads.repository.BookRepository;
import com.books.bookreads.service.BookService;
import com.books.bookreads.service.ReaderService;
import jakarta.servlet.ServletContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookServiceImpl implements BookService {
    private final BookRepository bookRepository;
    private final BookMapper bookMapper;
    private final ReaderService readerService;
    private final ServletContext servletContext;
    private final JWTService jwtService;

    public BookServiceImpl(BookRepository bookRepository, BookMapper bookMapper, ReaderService readerService, ServletContext servletContext, JWTService jwtService) {
        this.bookRepository = bookRepository;
        this.bookMapper = bookMapper;
        this.readerService = readerService;
        this.servletContext = servletContext;
        this.jwtService = jwtService;
    }

    public List<BookDto> findAll() {
        return bookRepository.findAll().stream()
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
        String jwtToken = token.substring(7).trim();
        String email = jwtService.extractUsername(jwtToken);
        Reader reader = readerService.findByEmail(email);

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

        readerService.updateReaderPointsAndLevel(reader,(int) bookDto.getPoints());
        bookRepository.save(book);
    }

    @Override
    public BookDto updateBook(Long bookId, BookDtoRequest request, String coverPath, String jwtToken) {
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found,"));

        int pointsDifference = (int) (request.getPoints() - book.getPoints());
        readerService.updateReaderPointsAndLevel(reader, pointsDifference);

        bookMapper.updateBookFromDto(bookMapper.toBookDto(request), book);
        book.setCoverUrl(coverPath);

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

    @Override
    public String saveCoverImage(MultipartFile cover) throws IOException {
        String originalFilename = cover.getOriginalFilename();
        String extension = originalFilename != null ? originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
        String uniqueFileName = UUID.randomUUID().toString() + extension;

        String realUploadDir = servletContext.getContextPath();
        Path directoryPath = Paths.get("frontend/public/uploads").toAbsolutePath();

        if (!Files.exists(directoryPath)) {
            Files.createDirectories(directoryPath);
        }

        Path filePath = directoryPath.resolve(uniqueFileName);

        try {
            cover.transferTo(filePath.toFile());
        } catch (IOException e) {
            System.err.println("Error during file transfer: " + e.getMessage());
            e.printStackTrace();
        }

        return "/uploads/" + uniqueFileName;
    }

}
