package com.books.bookreads.service.impl;

import com.books.bookreads.mapper.ReadingListMapper;
import com.books.bookreads.model.Book;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.ReadingList;
import com.books.bookreads.model.dtos.ReadingListDto;
import com.books.bookreads.repository.BookRepository;
import com.books.bookreads.repository.ReaderRepository;
import com.books.bookreads.repository.ReadingListRepository;
import com.books.bookreads.service.ReaderService;
import com.books.bookreads.service.ReadingListService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class ReadingListServiceImpl implements ReadingListService {
    private final ReadingListRepository readingListRepository;
    private final BookRepository bookRepository;
    private final ReaderRepository readerRepository;
    private final ReaderService readerService;
    private final ReadingListMapper readingListMapper;


    public ReadingListServiceImpl(ReadingListRepository readingListRepository, BookRepository bookRepository, ReaderRepository readerRepository, ReaderService readerService, ReadingListMapper readingListMapper) {
        this.readingListRepository = readingListRepository;
        this.bookRepository = bookRepository;
        this.readerRepository = readerRepository;
        this.readerService = readerService;
        this.readingListMapper = readingListMapper;
    }

    @Transactional
    @Override
    public List<ReadingListDto> getReadingListsForReader(Long readerId) {
        Reader reader = readerRepository.getReferenceById(readerId);
        List<ReadingList> readingLists = readingListRepository.findAllByReader(reader);
        List<ReadingListDto> readingListDtos = new ArrayList<>();
        for (ReadingList list : readingLists){
            readingListDtos.add(readingListMapper.toReadingListDto(list));
        }

        return readingListDtos;
    }

    @Override
    public ReadingList getReadingListById(Long readingListId) {
        return readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading list not found"));
    }

    @Transactional
    @Override
    public void createReadingList(ReadingListDto readingListDto, String jwtToken) {
        ReadingList readingList = new ReadingList(readingListDto.getTitle(),readingListDto.getDescription());
        Reader reader = readerService.getReaderFromToken(jwtToken);
        readingList.setReader(reader);
        readingList.setBooks(getAllBooksById(readingListDto.getBooks()));
        readingListRepository.save(readingList);
    }

    @Transactional
    @Override
    public ReadingListDto updateReadingList(Long readingListId, ReadingListDto readingListDto) {
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading list not found"));
        readingList.setTitle(readingListDto.getTitle());
        readingList.setDescription(readingListDto.getDescription());
        readingList.setBooks(getAllBooksById(readingListDto.getBooks()));
        return readingListMapper.toReadingListDto(readingList);
    }

    @Override
    public void deleteReadingList(Long readingListId) {
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading list not found"));

        readingList.getBooks().clear();
        readingListRepository.save(readingList);

        readingListRepository.delete(readingList);
    }

    @Override
    public ReadingListDto likeReadingList(String token, Long readingListId) {
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading List not found"));
        Reader reader = readerService.getReaderFromToken(token);
        if(readingList.getReader() == reader){
            throw new IllegalArgumentException("Can't like your own reading list");
        }
        List<Reader> readerLikes = readingList.getReaderLikes();
        if(!readerLikes.contains(reader)){
            readerLikes.add(reader);
        }
        readingList.setReaderLikes(readerLikes);
        readingListRepository.save(readingList);
        return readingListMapper.toReadingListDto(readingList);
    }

    @Override
    public ReadingListDto unlikeReadingList(String token, Long readingListId) {
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading List not found"));
        Reader reader = readerService.getReaderFromToken(token);
        if(readingList.getReader() == reader){
            throw new IllegalArgumentException("Can't like your own reading list");
        }
        List<Reader> readerLikes = readingList.getReaderLikes();
        readerLikes.remove(reader);
        readingList.setReaderLikes(readerLikes);
        readingListRepository.save(readingList);
        return readingListMapper.toReadingListDto(readingList);
    }

    @Override
    public Boolean isReadingListLiked(String token, Long readingListId) {
        Reader reader = readerService.getReaderFromToken(token);
        ReadingList readingList = readingListRepository.findById(readingListId)
                .orElseThrow(() -> new IllegalArgumentException("Reading List not found"));
        return readingList.getReaderLikes().contains(reader);
    }

    private Set<Book> getAllBooksById(List<Long> bookIds){
        Set<Book> books = new HashSet<>();
        for (Long bookId :bookIds) {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new IllegalArgumentException("Book with ID " + bookId + " not found."));
            books.add(book);
        }
        return books;
    }
}
