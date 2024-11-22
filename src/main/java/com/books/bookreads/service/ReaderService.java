package com.books.bookreads.service;

import com.books.bookreads.model.Reader;
import com.books.bookreads.model.dtos.ReaderProfileInfoRequest;

import java.util.Set;

public interface ReaderService {
    Reader findById(Long readerId);
    Reader findByEmail(String email);
    Reader getReaderFromToken(String jwtToken);
    Reader editProfileInfo(Reader reader, ReaderProfileInfoRequest profileInfoRequest);
    void updateReaderPointsAndLevel(Reader reader, int pointsChange);
    int calculateLevel(int totalPoints);
    void followUser(Long followerId, Long followingId);
    void unfollowUser(Long followerId, Long followingId);
    Set<Long> getFollowing(Long readerId);
    Set<Long> getFollowers(Long readerId);
    Boolean isReaderFollowed(Reader reader, Long readerId);
}
