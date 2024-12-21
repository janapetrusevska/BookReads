package com.books.bookreads.web;

import com.books.bookreads.model.dtos.CommentDto;
import com.books.bookreads.service.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:8080"}, allowCredentials = "true", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/comment")
public class CommentController {
    private final CommentService commentService;

    @GetMapping("/{readingListId}")
    public ResponseEntity<List<CommentDto>> getAllCommentsForReadingList(@PathVariable Long readingListId){
        List<CommentDto> comments = commentService.getAllCommentsForReadingList(readingListId);
        return ResponseEntity.ok(comments);
    };

    @PostMapping("/{readingListId}/add")
    public ResponseEntity<CommentDto> addComment(@RequestHeader("Authorization") String token,
                                                 @PathVariable Long readingListId,
                                                 @RequestBody String content){
        token = token.substring(7);
        CommentDto commentDto = commentService.addComment(token,readingListId,content);
        return ResponseEntity.ok(commentDto);
    }

    @PutMapping("/edit/{commentId}")
    public ResponseEntity<CommentDto> editComment(@PathVariable Long commentId,
                                                  @RequestBody String content){
        CommentDto commentDto = commentService.editComment(commentId,content);
        return ResponseEntity.ok(commentDto);
    }

    @DeleteMapping("/delete/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId){
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }
}
