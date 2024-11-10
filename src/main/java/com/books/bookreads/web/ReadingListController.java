package com.books.bookreads.web;

import com.books.bookreads.model.ReadingList;
import com.books.bookreads.model.dtos.ReadingListDto;
import com.books.bookreads.service.ReadingListService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/readingList")
public class ReadingListController {

    private final ReadingListService readingListService;

    @GetMapping
    public ResponseEntity<List<ReadingListDto>> getAllReadingListsByUser(@RequestHeader("Authorization") String jwtToken){
        String token = jwtToken.substring(7).trim();
        List<ReadingListDto> readingLists = readingListService.getReadingListsForReader(token);
        return ResponseEntity.ok(readingLists);
    }

    @GetMapping("/{readingListId}")
    public ResponseEntity<ReadingList> getReadingListById(@PathVariable Long readingListId){
        ReadingList readingList = readingListService.getReadingListById(readingListId);
        return ResponseEntity.ok(readingList);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createReadingList(@RequestHeader("Authorization") String jwtToken,
                                                  @RequestBody ReadingListDto readingListDto){
        String token = jwtToken.substring(7).trim();
        readingListService.createReadingList(readingListDto,token);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{readingListId}")
    public ResponseEntity<ReadingListDto> updateReadingList(@PathVariable Long readingListId,
                                                            @RequestBody ReadingListDto readingListDto){
        ReadingListDto readingList = readingListService.updateReadingList(readingListId,readingListDto);
        return ResponseEntity.ok(readingList);
    }

    @DeleteMapping("/delete/{readingListId}")
    public ResponseEntity<Void> deleteReadingList(@PathVariable Long readingListId){
        readingListService.deleteReadingList(readingListId);
        return ResponseEntity.ok().build();
    }
}
