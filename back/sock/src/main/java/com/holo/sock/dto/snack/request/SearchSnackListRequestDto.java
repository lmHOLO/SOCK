package com.holo.sock.dto.snack.request;

import lombok.*;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SearchSnackListRequestDto {

    private String keyword;
    private List<String> flavors;
    private List<String> types;
    private String arrange;


}
