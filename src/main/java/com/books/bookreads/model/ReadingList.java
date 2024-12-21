package com.books.bookreads.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;
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

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "READING_LIST_LIKES",
            joinColumns = @JoinColumn(name = "LIST_ID"),
            inverseJoinColumns = @JoinColumn(name = "READER_ID")
    )
    private List<Reader> readerLikes;

    @ManyToOne
    @JoinColumn(name = "READER_ID",nullable = false)
    private Reader reader;

    @OneToMany(mappedBy = "readingList",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments;

    private LocalDate dateCreated;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "READING_LIST_BOOKS",
            joinColumns = @JoinColumn(name = "LIST_ID"),
            inverseJoinColumns = @JoinColumn(name = "BOOK_ID")
    )
    private Set<Book> books;

    public ReadingList(String title, String description) {
        this.title = title;
        this.description = description;
        this.dateCreated = LocalDate.now();
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        ReadingList that = (ReadingList) obj;
        return id != null && id.equals(that.id);
    }

}
