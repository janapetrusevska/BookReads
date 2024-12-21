package com.books.bookreads.service.impl;

import com.books.bookreads.mapper.CommentMapper;
import com.books.bookreads.model.Comment;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.ReadingList;
import com.books.bookreads.model.dtos.CommentDto;
import com.books.bookreads.repository.CommentRepository;
import com.books.bookreads.repository.ReadingListRepository;
import com.books.bookreads.service.CommentService;
import com.books.bookreads.service.ReaderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final ReadingListRepository readingListRepository;
    private final CommentMapper commentMapper;
    private final ReaderService readerService;

    public CommentServiceImpl(CommentRepository commentRepository, ReadingListRepository readingListRepository, CommentMapper commentMapper, ReaderService readerService) {
        this.commentRepository = commentRepository;
        this.readingListRepository = readingListRepository;
        this.commentMapper = commentMapper;
        this.readerService = readerService;
    }

    @Override
    public List<CommentDto> getAllCommentsForReadingList(Long readingListId) {
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading list not found"));
        List<Comment> comments = commentRepository.findAllByReadingList(readingList);
        return comments.stream()
                .map(commentMapper::toCommentDto)
                .collect(Collectors.toList());
    }

    @Override
    public CommentDto addComment(String token, Long readingListId, String content) {
        Reader reader = readerService.getReaderFromToken(token);
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading list not found"));
        Comment comment = new Comment();
        comment.setReader(reader);
        comment.setReadingList(readingList);
        comment.setContent(content);
        comment.setCreatedDate(LocalDateTime.now());
        commentRepository.save(comment);
        return commentMapper.toCommentDto(comment);
    }

    @Override
    public CommentDto editComment(Long commentId, String content) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        comment.setContent(content);
        return commentMapper.toCommentDto(comment);
    }

    @Override
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Comment not found"));
        commentRepository.delete(comment);
    }
}
