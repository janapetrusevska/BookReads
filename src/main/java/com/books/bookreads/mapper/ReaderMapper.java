package com.books.bookreads.mapper;

import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.ReaderDto;
import com.books.bookreads.repository.BookRepository;
import com.books.bookreads.repository.ReaderRepository;
import org.springframework.stereotype.Component;

@Component
public class ReaderMapper {
    private final ReaderRepository readerRepository;
    private final BookRepository bookRepository;

    public ReaderMapper(ReaderRepository readerRepository, BookRepository bookRepository) {
        this.readerRepository = readerRepository;
        this.bookRepository = bookRepository;
    }

    public ReaderDto toReaderDto(Reader reader) {
        if (reader == null) {
            return null;
        }

        return new ReaderDto(
                reader.getId(),
                reader.getName(),
                reader.getEmail(),
                bookRepository.countByReaderId(reader.getId())
        );
    }
}
