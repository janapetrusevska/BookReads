package com.books.bookreads.model.dtos;

import lombok.Data;

import java.time.LocalDate;
@Data
public class BookDtoRequest {
    private String title;
    private String author;
    private String language;
    private double rating;
    private double stars;
    private double points;
    private LocalDate readDate;
    private String genre;
    private String status;
    private String cover;
    private String note;
}