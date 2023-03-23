package com.holo.sock.repository.jdbc;

import lombok.*;

@Data
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class GroupSnackDto {

    private Long flavorId;
    private String flavorName;
    private String snackIds;

}
