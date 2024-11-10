package com.books.bookreads.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "comment_seq_gen", sequenceName = "comment_id_seq", allocationSize = 1)
    @Column(name = "id", nullable = false)
    private Long id;

    @Lob
    @Column(name = "content")
    private String content;

    LocalDateTime createdDate;

    @ManyToOne
    @JoinColumn(name = "READER_ID", nullable = false)
    private Reader reader;

    @ManyToOne
    @JoinColumn(name = "READING_LIST_ID", nullable = false)
    private ReadingList readingList;

    public Comment(String content, Reader reader, ReadingList readingList) {
        this.content = content;
        this.reader = reader;
        this.readingList = readingList;
        this.createdDate = LocalDateTime.now();
    }
}
