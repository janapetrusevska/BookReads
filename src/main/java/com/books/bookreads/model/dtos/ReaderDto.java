package com.books.bookreads.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReaderDto {
    private Long id;
    private String name;
    private String aboutMe;
    private String email;
    private int booksRead;
    private int totalPoints;
    private int level;
    private LocalDate dateCreated;

    public ReaderDto(Long readerId) {
        this.id = readerId;
    }
}