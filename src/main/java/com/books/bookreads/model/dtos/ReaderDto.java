package com.books.bookreads.model.dtos;

import com.books.bookreads.model.Reader;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReaderDto {
    private Long id;
    private String name;
    private String email;

    public ReaderDto(Long readerId) {
        this.id = readerId;
    }
}