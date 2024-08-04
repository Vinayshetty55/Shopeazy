package com.ShopEazy.ShopeazyBackend.services.jwt;

import com.ShopEazy.ShopeazyBackend.entity.User;
import com.ShopEazy.ShopeazyBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional <User> optionalUser = userRepository.findFirstByEmail(username);
        if(optionalUser.isEmpty()) throw new UsernameNotFoundException("User Name Not Found" , null);
        return new org.springframework.security.core.userdetails.User(optionalUser.get().getEmail() , optionalUser.get().getPassword() , new ArrayList<>());



    }
}
