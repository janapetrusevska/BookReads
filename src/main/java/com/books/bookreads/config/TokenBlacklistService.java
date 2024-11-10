package com.books.bookreads.config;

import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

@Service
@AllArgsConstructor
public class TokenBlacklistService {
    private final Set<String> blacklistedTokens = new HashSet<String>();
    private final JWTService jwtService;

    public void blacklistToken(String token) {
        blacklistedTokens.add(token);
    }

    public boolean isTokenBlacklisted(String token) {
        return blacklistedTokens.contains(token);
    }

    @Scheduled(fixedRate = 21600000)
    public void removeExpiredTokens() {
        Iterator<String> iterator = blacklistedTokens.iterator();
        while (iterator.hasNext()) {
            String token = iterator.next();
            if (jwtService.isTokenExpired(token)) {
                iterator.remove();
            }
        }
    }
}