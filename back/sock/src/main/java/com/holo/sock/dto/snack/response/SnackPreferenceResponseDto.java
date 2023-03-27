package com.holo.sock.dto.snack.response;

import lombok.*;

@Data
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class SnackPreferenceResponseDto {

    private Long snackId;
    private String name;
    private String image;

}
