package com.books.bookreads.service;

import com.books.bookreads.model.ReadingList;
import com.books.bookreads.model.dtos.ReadingListDto;

import java.util.List;

public interface ReadingListService {
    List<ReadingListDto> getReadingListsForReader(String jwtToken);
    ReadingList getReadingListById(Long readingListId);
    void createReadingList(ReadingListDto readingListDto, String jwtToken);
    ReadingListDto updateReadingList(Long readingListId, ReadingListDto readingListDto);
    void deleteReadingList(Long readingListId);
}
