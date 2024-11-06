package com.books.bookreads.service.impl;

import com.books.bookreads.config.JWTService;
import com.books.bookreads.model.Reader;
import com.books.bookreads.repository.ReaderRepository;
import com.books.bookreads.service.ReaderService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ReaderServiceImpl implements ReaderService {

    private final ReaderRepository readerRepository;
    private final JWTService jwtService;

    public ReaderServiceImpl(ReaderRepository readerRepository, JWTService jwtService) {
        this.readerRepository = readerRepository;
        this.jwtService = jwtService;
    }

    @Override
    public Reader findById(Long readerId){
        return readerRepository.findById(readerId)
                .orElseThrow(() -> new IllegalArgumentException("Reader with ID " + readerId + " not found."));
    }

    @Override
    public Reader findByEmail(String email) {
        return readerRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Reader with email" + email + " not found."));
    }

    @Override
    public Reader getReaderFromToken(String jwtToken) {
        String loggedReaderEmail = jwtService.extractUsername(jwtToken);
        return readerRepository.findByEmail(loggedReaderEmail)
                .orElseThrow(() -> new IllegalArgumentException("Couldn't find reader by email"));
    }

    @Override
    public void updateReaderPointsAndLevel(Reader reader, int pointsChange) {
        reader.setTotalPoints(reader.getTotalPoints() + pointsChange);
        reader.setLevel(calculateLevel(reader.getTotalPoints()));
        readerRepository.save(reader);
    }

    @Override
    public int calculateLevel(int totalPoints) {
        int level = 1;

        while (level <= 50 && totalPoints >= calculateLevelThreshold(level)) {
            level++;
        }

        return level;
    }
    private int calculateLevelThreshold(int level) {
        if (level <= 10) return level * 10;
        if (level <= 20) return 100 + (level - 10) * 15;
        if (level <= 30) return 250 + (level - 20) * 20;
        if (level <= 40) return 450 + (level - 30) * 25;
        if (level <= 50) return 700 + (level - 40) * 30;
        return 1000;
    }
}
