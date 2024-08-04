package com.ShopEazy.ShopeazyBackend.services.auth;

import com.ShopEazy.ShopeazyBackend.dto.SignupRequest;
import com.ShopEazy.ShopeazyBackend.dto.UserDto;

public interface AuthService {

    UserDto createUser(SignupRequest signupRequest);

    Boolean hasUserWithEmail(String email);

}