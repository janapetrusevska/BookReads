package com.books.bookreads.mapper;

import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.BookDto;
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
                book.getTitle(),
                book.getAuthor(),
                book.getLanguage(),
                book.getRating(),
                book.getStars(),
                book.getPoints(),
                book.getGenre().name(),
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

        setEntityValuesFromDto(bookDto, book);
        setReaderFromDto(bookDto, book);
    }

    private void setEntityValuesFromDto(BookDto bookDto, Book book) {
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setLanguage(bookDto.getLanguage());
        book.setRating(bookDto.getRating());
        book.setStars(bookDto.getStars());
        book.setPoints(bookDto.getPoints());
        book.setGenre(Genre.valueOf(bookDto.getGenre()));
        book.setCoverUrl(bookDto.getCoverUrl());
        book.setNote(bookDto.getNote());
    }

    private void setReaderFromDto(BookDto bookDto, Book book) {
        if (bookDto.getReader() != null && bookDto.getReader().getId() != null) {
            Reader reader = readerRepository.findById(bookDto.getReader().getId())
                    .orElseThrow(() -> new IllegalArgumentException("Reader not found"));
            book.setReader(reader);
        }
    }
}
