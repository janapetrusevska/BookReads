package com.books.bookreads.repository;

import com.books.bookreads.model.Reader;
import com.books.bookreads.model.ReadingList;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReadingListRepository extends JpaRepository<ReadingList, Long> {
    @EntityGraph(attributePaths = {"books"})
    List<ReadingList> findAllByReader(Reader reader);
}
