package com.books.bookreads.service;

import com.books.bookreads.model.dtos.CommentDto;

import java.util.List;

public interface CommentService {
    List<CommentDto> getAllCommentsForReadingList(Long readingListId);
    CommentDto addComment(String token, Long readingListId, String content);
    CommentDto editComment(Long commentId, String content);
    void deleteComment(Long commentId);
}
