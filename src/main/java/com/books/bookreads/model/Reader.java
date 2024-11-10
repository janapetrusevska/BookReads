package com.books.bookreads.model;

import com.books.bookreads.model.enums.Role;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Reader implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    private String name;
    @Column(length = 500)
    private String aboutMe;
    @Column(unique = true)
    private String email;
    private String password;
    private int totalPoints;
    private int level;
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dateCreated;

    @Transient
    private List<Book> booksRead;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "reader",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<ReadingList> readingLists;

    @OneToMany(mappedBy = "reader",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Comment> comments;

    public Reader() {
        this.level = 1;
        this.dateCreated = LocalDate.now();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
