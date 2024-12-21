package com.books.bookreads.model.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;

@Data
public class ReadingListDto {
    private Long id;
    private String title;
    private String description;
    private List<Long> books;
    private LocalDate dateCreated;
    private Long numberOfLikes;
    private List<Long> readerLikes;
}

