package com.books.bookreads.web;

import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.dtos.BookDtoRequest;
import com.books.bookreads.model.enums.BookStatus;
import com.books.bookreads.model.enums.Genre;
import com.books.bookreads.service.BookService;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final ObjectMapper objectMapper;

    @GetMapping
    public ResponseEntity<List<BookDto>> getAllBooks(){
        List<BookDto> books = bookService.findAll();
        return ResponseEntity.ok(books);
    }

    @GetMapping("/{bookId}")
    public ResponseEntity<BookDto> findBookById(@PathVariable Long bookId) {
        BookDto bookDto = bookService.findById(bookId);
        return ResponseEntity.ok(bookDto);
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addBook(
            @RequestPart("bookDtoRequest") String bookJson,
            @RequestPart(value = "cover", required = false) MultipartFile cover,
            @RequestHeader("Authorization") String token) {

        String jwtToken = token.substring(7).trim();

        try {
            BookDtoRequest request = objectMapper.readValue(bookJson, BookDtoRequest.class);

            if (cover != null && !cover.isEmpty()) {
                String coverPath = bookService.saveCoverImage(cover);
                bookService.addBook(request, coverPath, jwtToken);
            } else {
                bookService.addBook(request, "", jwtToken);
            }

            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update/{bookId}")
    public ResponseEntity<BookDto> updateBook(@PathVariable Long bookId, @RequestBody BookDto bookDto,
                                              @RequestHeader("Authorization") String token){
        String jwtToken = token.substring(7).trim();
        BookDto updatedBook = bookService.updateBook(bookId,bookDto,jwtToken);
        return ResponseEntity.ok(updatedBook);
    }

    @DeleteMapping("/delete/{bookId}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long bookId, @RequestHeader("Authorization") String token){
        String jwtToken = token.substring(7).trim();
        bookService.deleteBook(bookId,jwtToken);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/bestRated")
    public ResponseEntity<List<BookDto>> getBestRatedBooks(){
        List<BookDto> bestRatedBooks = bookService.getBestRated();
        return ResponseEntity.ok(bestRatedBooks);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<BookDto>> getBooksByStatus(@PathVariable BookStatus status){
        List<BookDto> wishlist = bookService.getBooksByStatus(status);
        return ResponseEntity.ok(wishlist);
    }

    @GetMapping("/genres")
    public ResponseEntity<List<Genre>> getAllBookGenres(){
        List<Genre> genres = Arrays.asList(Genre.values());
        return ResponseEntity.ok(genres);
    }
}
