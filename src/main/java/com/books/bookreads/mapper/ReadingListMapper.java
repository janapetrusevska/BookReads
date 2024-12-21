package com.books.bookreads.mapper;

import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.ReadingList;
import com.books.bookreads.model.dtos.ReadingListDto;
import com.books.bookreads.repository.ReadingListRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ReadingListMapper {
    private final ReadingListRepository readingListRepository;

    public ReadingListMapper(ReadingListRepository readingListRepository) {
        this.readingListRepository = readingListRepository;
    }

    public ReadingListDto toReadingListDto(ReadingList readingList){
        ReadingListDto readingListDto = new ReadingListDto();
        readingListDto.setId(readingList.getId());
        readingListDto.setTitle(readingList.getTitle());
        readingListDto.setDescription(readingList.getDescription());
        readingListDto.setDateCreated(readingList.getDateCreated());
        List<Reader> readersLikes = readingList.getReaderLikes();
        Long numberOfReaderLikes = (long) readersLikes.size();
        readingListDto.setNumberOfLikes(numberOfReaderLikes);
        List<Book> bookList = readingList.getBooks().stream().toList();
        List<Long> bookIds = bookList.stream()
                .map(Book::getId).toList();
        readingListDto.setBooks(bookIds);

        return readingListDto;
    }
}
