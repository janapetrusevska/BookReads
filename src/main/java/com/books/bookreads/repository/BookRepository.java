package com.books.bookreads.repository;

import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.enums.BookStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book,Long> {
    List<Book> findAllByReaderOrderByTitleAsc(Reader reader);
    List<Book> findByStars(double stars);
    List<Book> findByStatusAndReader(BookStatus status, Reader reader);
    List<Book> findByReaderId(Long readerId);
    int countByReaderId(Long readerId);
}
