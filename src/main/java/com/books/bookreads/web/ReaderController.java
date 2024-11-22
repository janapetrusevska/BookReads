package com.books.bookreads.web;

import com.books.bookreads.config.JWTService;
import com.books.bookreads.mapper.ReaderMapper;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.ReaderDto;
import com.books.bookreads.model.dtos.ReaderProfileInfoRequest;
import com.books.bookreads.repository.ReaderRepository;
import com.books.bookreads.service.ReaderService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@CrossOrigin(origins = {"http://localhost:8080"}, allowCredentials = "true", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reader")
public class ReaderController {
    private final ReaderService readerService;
    private final JWTService jwtService;
    private final ReaderMapper readerMapper;
    private final ReaderRepository readerRepository;
    private final ObjectMapper objectMapper;

    @GetMapping("/all")
    public ResponseEntity<List<ReaderDto>> getAllReaders(){
        List<ReaderDto> readerDtos = readerRepository.findAll().stream()
                .map(readerMapper::toReaderDto).toList();
        return ResponseEntity.ok(readerDtos);
    }

    @GetMapping("/profile/{readerId}")
    public ResponseEntity<ReaderDto> getReaderProfileInfo (@PathVariable Long readerId, HttpServletRequest request){
        String jwtToken = request.getHeader("Authorization");

        Reader reader = readerService.findById(readerId);
        if (reader == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        if (jwtToken != null && jwtToken.startsWith("Bearer ")) {
            jwtToken = jwtToken.substring(7);
            if (jwtService.isTokenValid(jwtToken)) {
                ReaderDto readerDto = readerMapper.toReaderDto(reader);
                return ResponseEntity.ok(readerDto);
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PutMapping("/editProfile")
    public ResponseEntity<ReaderDto> editProfileInfo(@RequestHeader("Authorization") String jwtToken,
                                                  @RequestPart("profileInfoRequest") String profileInfoJson) throws JsonProcessingException {
        ReaderProfileInfoRequest profileInfoRequest = objectMapper.readValue(profileInfoJson, ReaderProfileInfoRequest.class);
        jwtToken = jwtToken.substring(7);
        Reader reader = readerService.getReaderFromToken(jwtToken);
        reader = readerService.editProfileInfo(reader, profileInfoRequest);
        ReaderDto dto = readerMapper.toReaderDto(reader);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/follow/{followingId}")
    public ResponseEntity<Void> followReader(@RequestHeader("Authorization") String jwtToken,
                                             @PathVariable Long followingId){
        jwtToken = jwtToken.substring(7);
        Reader reader = readerService.getReaderFromToken(jwtToken);
        readerService.followUser(reader.getId(), followingId);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/unfollow/{followingId}")
    public ResponseEntity<Void> unfollowReader(@RequestHeader("Authorization") String jwtToken,
                                               @PathVariable Long followingId){
        jwtToken = jwtToken.substring(7);
        Reader reader = readerService.getReaderFromToken(jwtToken);
        readerService.unfollowUser(reader.getId(), followingId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/following")
    public ResponseEntity<Set<Long>> getReadersFollowing(@RequestHeader("Authorization") String jwtToken){
        jwtToken = jwtToken.substring(7);
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Set<Long> following = readerService.getFollowing(reader.getId());
        return ResponseEntity.ok(following);
    }

    @GetMapping("/followers")
    public ResponseEntity<Set<Long>> getReadersFollowers(@RequestHeader("Authorization") String jwtToken){
        jwtToken = jwtToken.substring(7);
        Reader reader = readerService.getReaderFromToken(jwtToken);
        Set<Long> followers = readerService.getFollowers(reader.getId());
        return ResponseEntity.ok(followers);
    }

    @GetMapping("/isFollowed/{followedId}")
    public ResponseEntity<Boolean> getIsReaderFollowed(@RequestHeader("Authorization") String jwtToken,
                                                       @PathVariable Long followedId){
        String token = jwtToken.substring(7);
        Reader reader = readerService.getReaderFromToken(token);
        Boolean isFollowed = readerService.isReaderFollowed(reader,followedId);
        return ResponseEntity.ok(isFollowed);
    }
}
