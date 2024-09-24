package com.books.bookreads.model.dtos;

import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookDto {
    private String title;
    private String author;
    private String language;
    private double rating;
    private double stars;
    private double points;
    private String genre;
    private String coverUrl;
    private String note;
    private ReaderDto reader;

    public BookDto(Book book) {
        BeanUtils.copyProperties(book, this);
        if (book.getReader() != null) {
            this.reader = new ReaderDto(book.getReader().getId());
        }
    }
}
