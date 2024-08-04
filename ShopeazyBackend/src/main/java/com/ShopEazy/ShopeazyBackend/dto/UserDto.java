package com.ShopEazy.ShopeazyBackend.dto;

import com.ShopEazy.ShopeazyBackend.enums.UserRole;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String email;
    private String name;
    private UserRole userRole;
}
