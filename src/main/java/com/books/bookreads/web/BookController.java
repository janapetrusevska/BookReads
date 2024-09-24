package com.books.bookreads.web;

import com.books.bookreads.config.JWTService;
import com.books.bookreads.mapper.BookMapper;
import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.service.BookService;
import com.books.bookreads.service.ReaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;
    private final ReaderService readerService;
    private final JWTService jwtService;

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
    public ResponseEntity<Void> addBook(@RequestBody BookDto bookDto, @RequestHeader("Authorization") String token){
        String jwtToken = token.substring(7).trim();

        try{
            bookService.addBook(bookDto, jwtToken);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e){
            return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE).build();
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

}
