package com.holo.sock.dto.data;

import lombok.*;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class PurchaseDumpDto {

    private Long member_id;
    private Long snack_id;
    private int purchase;
}
