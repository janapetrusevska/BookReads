package com.books.bookreads.service;

import com.books.bookreads.model.Reader;

public interface ReaderService {
    Reader findById(Long readerId);
    Reader findByEmail(String email);
    Reader getReaderFromToken(String jwtToken);
    void updateReaderPointsAndLevel(Reader reader, int pointsChange);
    int calculateLevel(int totalPoints);
}
