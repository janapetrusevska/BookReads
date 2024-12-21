package com.books.bookreads.mapper;

import com.books.bookreads.model.Comment;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.CommentDto;
import com.books.bookreads.repository.ReaderRepository;
import com.books.bookreads.repository.ReadingListRepository;
import org.springframework.stereotype.Component;

@Component
public class CommentMapper {

    private final ReaderRepository readerRepository;
    private final ReadingListRepository readingListRepository;

    public CommentMapper(ReaderRepository readerRepository, ReadingListRepository readingListRepository) {
        this.readerRepository = readerRepository;
        this.readingListRepository = readingListRepository;
    }

    public CommentDto toCommentDto(Comment comment){
        CommentDto commentDto = new CommentDto();
        commentDto.setId(comment.getId());
        commentDto.setContent(comment.getContent());
        Reader reader = readerRepository.findById(comment.getReader().getId())
                .orElseThrow(() -> new IllegalArgumentException("Reader not found"));
        commentDto.setReaderName(reader.getName());
        commentDto.setReaderId(reader.getId());
        commentDto.setReadingListId(comment.getReadingList().getId());
        commentDto.setDateCreated(comment.getCreatedDate());
        return commentDto;
    }
}
