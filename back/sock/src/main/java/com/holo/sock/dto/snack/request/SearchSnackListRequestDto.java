package com.holo.sock.dto.snack.request;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SearchSnackListRequestDto {

    private String keyword;
    private String flavor;
    private String type;


}
