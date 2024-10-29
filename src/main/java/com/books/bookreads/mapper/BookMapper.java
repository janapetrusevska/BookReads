package com.books.bookreads.mapper;

import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.dtos.BookDtoRequest;
import com.books.bookreads.model.enums.BookStatus;
import com.books.bookreads.model.enums.Genre;
import com.books.bookreads.repository.ReaderRepository;
import org.springframework.stereotype.Component;

@Component
public class BookMapper {
    private final ReaderRepository readerRepository;
    private final ReaderMapper readerMapper;

    public BookMapper(ReaderRepository readerRepository, ReaderMapper readerMapper) {
        this.readerRepository = readerRepository;
        this.readerMapper = readerMapper;
    }

    public BookDto toBookDto(Book book) {
        if (book == null) {
            return null;
        }

        return new BookDto(
                book.getId(),
                book.getTitle(),
                book.getAuthor(),
                book.getLanguage(),
                book.getRating(),
                book.getStars(),
                book.getPoints(),
                book.getReadDate(),
                book.getGenre().name(),
                book.getStatus().name(),
                book.getCoverUrl(),
                book.getNote(),
                book.getReader() != null ? readerMapper.toReaderDto(book.getReader()) : null
        );
    }

    public Book toBookEntity(BookDto bookDto) {
        if (bookDto == null) {
            return null;
        }

        Book book = new Book();
        updateBookFromDto(bookDto, book);
        setReaderFromDto(bookDto, book);
        return book;
    }

    public void updateBookFromDto(BookDto bookDto, Book book) {
        if (bookDto == null || book == null) {
            return;
        }

        if (bookDto.getTitle() != null) {
            book.setTitle(bookDto.getTitle());
        }
        if (bookDto.getAuthor() != null) {
            book.setAuthor(bookDto.getAuthor());
        }
        if (bookDto.getLanguage() != null) {
            book.setLanguage(bookDto.getLanguage());
        }
        if (bookDto.getRating() != 0) {
            book.setRating(bookDto.getRating());
        }
        if (bookDto.getStars() != 0) {
            book.setStars(bookDto.getStars());
        }
        if (bookDto.getPoints() != 0) {
            book.setPoints(bookDto.getPoints());
        }
        if (bookDto.getReadDate() != null) {
            book.setReadDate(bookDto.getReadDate());
        }
        if (bookDto.getGenre() != null) {
            book.setGenre(Genre.valueOf(bookDto.getGenre()));
        }
        if (bookDto.getStatus() != null) {
            book.setStatus(BookStatus.valueOf(bookDto.getStatus()));
        }
        if (bookDto.getCoverUrl() != null) {
            book.setCoverUrl(bookDto.getCoverUrl());
        }
        if (bookDto.getNote() != null) {
            book.setNote(bookDto.getNote());
        }

        setReaderFromDto(bookDto, book);
    }

    private void setReaderFromDto(BookDto bookDto, Book book) {
        if (bookDto.getReader() != null && bookDto.getReader().getId() != null) {
            Reader reader = readerRepository.findById(bookDto.getReader().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Reader not found"));
            book.setReader(reader);
        }
    }

    public BookDto toBookDto(BookDtoRequest request) {
        BookDto bookDto = new BookDto();
        bookDto.setTitle(request.getTitle());
        bookDto.setAuthor(request.getAuthor());
        bookDto.setLanguage(request.getLanguage());
        bookDto.setRating(request.getRating());
        bookDto.setStars(request.getStars());
        bookDto.setPoints(request.getPoints());
        bookDto.setReadDate(request.getReadDate());
        bookDto.setGenre(request.getGenre());
        bookDto.setStatus(request.getStatus());
        bookDto.setCoverUrl(request.getCover());
        bookDto.setNote(request.getNote());
        return bookDto;
    }
}
