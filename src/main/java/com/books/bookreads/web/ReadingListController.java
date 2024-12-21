package com.books.bookreads.web;

import com.books.bookreads.model.ReadingList;
import com.books.bookreads.model.dtos.ReadingListDto;
import com.books.bookreads.service.ReadingListService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/readingList")
public class ReadingListController {

    private final ReadingListService readingListService;
    private final ObjectMapper objectMapper;

    @GetMapping("byReader/{readerId}")
    public ResponseEntity<List<ReadingListDto>> getAllReadingListsByUser(@RequestHeader("Authorization") String token,
                                                                         @PathVariable Long readerId){
        List<ReadingListDto> readingLists = readingListService.getReadingListsForReader(readerId);
        return ResponseEntity.ok(readingLists);
    }

    @GetMapping("/{readingListId}")
    public ResponseEntity<ReadingList> getReadingListById(@PathVariable Long readingListId){
        ReadingList readingList = readingListService.getReadingListById(readingListId);
        return ResponseEntity.ok(readingList);
    }

    @PostMapping("/create")
    public ResponseEntity<Void> createReadingList(@RequestHeader("Authorization") String token,
                                                  @RequestBody ReadingListDto readingListDto){
        token = token.substring(7).trim();
        readingListService.createReadingList(readingListDto,token);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/update/{readingListId}")
    public ResponseEntity<ReadingListDto> updateReadingList(@RequestHeader("Authorization") String token,
                                                            @PathVariable Long readingListId,
                                                            @RequestPart("readingListDto") String readingListJson) throws JsonProcessingException {
        ReadingListDto readingListDto = objectMapper.readValue(readingListJson, ReadingListDto.class);
        ReadingListDto readingList = readingListService.updateReadingList(readingListId,readingListDto);
        return ResponseEntity.ok(readingList);
    }

    @DeleteMapping("/delete/{readingListId}")
    public ResponseEntity<Void> deleteReadingList(@PathVariable Long readingListId){
        readingListService.deleteReadingList(readingListId);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{readingListId}/like")
    public ResponseEntity<ReadingListDto> likeReadingList(@RequestHeader("Authorization") String token,
                                                          @PathVariable Long readingListId){
        token = token.substring(7);
        ReadingListDto readingListDto = readingListService.likeReadingList(token,readingListId);
        return ResponseEntity.ok(readingListDto);
    }

    @PutMapping("/{readingListId}/unlike")
    public ResponseEntity<ReadingListDto> unlikeReadingList(@RequestHeader("Authorization") String token,
                                                          @PathVariable Long readingListId){
        token = token.substring(7);
        ReadingListDto readingListDto = readingListService.unlikeReadingList(token,readingListId);
        return ResponseEntity.ok(readingListDto);
    }

    @GetMapping("/{readingListId}/isLiked")
    public ResponseEntity<Boolean> getIsReadingListLiked(@RequestHeader("Authorization") String jwtToken,
                                                       @PathVariable Long readingListId){
        String token = jwtToken.substring(7);
        Boolean isLiked = readingListService.isReadingListLiked(token,readingListId);
        return ResponseEntity.ok(isLiked);
    }
}
