package com.books.bookreads.model.dtos;

import lombok.Data;

@Data
public class ReaderProfileInfoRequest {
    String name;
    String email;
    String aboutMe;
}
