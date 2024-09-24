package com.books.bookreads.model;

import com.books.bookreads.model.dtos.BookDto;
import com.books.bookreads.model.enums.Genre;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.beans.BeanUtils;

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
    private double rating;
    private double stars;
    private double points;

    @Enumerated(EnumType.STRING)
    private Genre genre;
    @Lob
    @Column
    private String coverUrl;
    @Lob
    @Column
    private String note;
    @ManyToOne
    @JoinColumn(name = "reader_id", nullable = false)
    private Reader reader;

    public Book(BookDto bookDto){
        BeanUtils.copyProperties(bookDto, this, "id");
    }
}
