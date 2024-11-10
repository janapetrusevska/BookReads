package com.books.bookreads.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "LIST")
public class ReadingList {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "list_seq_gen", sequenceName = "list_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;
    private String title;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;
    private int likes;

    @ManyToOne
    @JoinColumn(name = "READER_ID",nullable = false)
    private Reader reader;

    @OneToMany(mappedBy = "readingList",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments;

    private LocalDate dateCreated;

    @ManyToMany
    @JoinTable(
            name = "READING_LIST_BOOKS",
            joinColumns = @JoinColumn(name = "LIST_ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_ID")
    )
    private Set<Book> books;

    public ReadingList(String title, String description) {
        this.title = title;
        this.description = description;
        this.likes=0;
        this.dateCreated = LocalDate.now();
    }
}
