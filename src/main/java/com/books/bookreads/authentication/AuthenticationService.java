package com.books.bookreads.authentication;

import com.books.bookreads.config.JWTService;
import com.books.bookreads.model.Reader;
import com.books.bookreads.model.enums.Role;
import com.books.bookreads.repository.ReaderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final ReaderRepository readerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JWTService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        var user = Reader.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .level(1)
                .dateCreated(LocalDate.now())
                .build();
        readerRepository.save(user);
        var jwtToken = jwtService.generateToken((UserDetails) user, user.getId());
        return AuthenticationResponse.builder().jwtToken(jwtToken).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = readerRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new Exception("User not found by email"));
        var jwtToken = jwtService.generateToken((UserDetails) user, user.getId());
        return AuthenticationResponse.builder().jwtToken(jwtToken).build();
    }
}
