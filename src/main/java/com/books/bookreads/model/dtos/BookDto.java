package com.books.bookreads.model.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private Long id;
    private String title;
    private String author;
    private String language;
    private double rating;
    private double stars;
    private double points;
    private LocalDate readDate;
    private String genre;
    private String status;
    private String coverUrl;
    private String note;
    private ReaderDto reader;

}
