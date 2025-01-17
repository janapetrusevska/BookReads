package com.books.bookreads.model;

import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.enums.BookStatus;
import com.books.bookreads.model.enums.Genre;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.BeanUtils;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "book")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "book_seq_gen", sequenceName = "book_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;
    private String title;
    private String author;
    private String language;
    private double stars;
    private double points;
    private LocalDate readDate;

    @Enumerated(EnumType.STRING)
    private Genre genre;
    @Enumerated(EnumType.STRING)
    private BookStatus status;

    @Lob
    @Column
    private String coverUrl;
    @Lob
    @Column
    private String note;
    @ManyToOne
    @JoinColumn(name = "reader_id", nullable = false)
    private Reader reader;

    @ManyToMany(mappedBy = "books")
    private Set<ReadingList> readingLists;

    public Book(BookDto bookDto){
        BeanUtils.copyProperties(bookDto, this, "id");
    }
}
