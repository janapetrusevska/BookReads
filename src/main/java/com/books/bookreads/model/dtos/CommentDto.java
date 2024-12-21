package com.books.bookreads.model.dtos;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CommentDto {
    private Long id;
    private String readerName;
    private Long readerId;
    private Long readingListId;
    private String content;
    private LocalDateTime dateCreated;
}
