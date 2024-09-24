package com.books.bookreads.mapper;

import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.ReaderDto;
import org.springframework.stereotype.Component;

@Component
public class ReaderMapper {

    public ReaderDto toReaderDto(Reader reader) {
        if (reader == null) {
            return null;
        }

        return new ReaderDto(
                reader.getId(),
                reader.getName(),
                reader.getEmail()
        );
    }
}
