package com.ShopEazy.ShopeazyBackend.controller;

import com.ShopEazy.ShopeazyBackend.dto.AuthenticationRequest;
import com.ShopEazy.ShopeazyBackend.dto.SignupRequest;
import com.ShopEazy.ShopeazyBackend.dto.UserDto;
import com.ShopEazy.ShopeazyBackend.entity.User;
import com.ShopEazy.ShopeazyBackend.repository.UserRepository;
import com.ShopEazy.ShopeazyBackend.services.auth.AuthService;
import com.ShopEazy.ShopeazyBackend.utils.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    private final AuthService authService;

    public static final String HEADER_STRING = "Authorization";
    public static final String TOKEN_PREFIX = "Bearer";


    @PostMapping("/authenticate")
    public void createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest,
                                          HttpServletResponse response) throws IOException, JSONException {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword()));
        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("User Name or Password is Incorrect");
        }
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        Optional<User> optionalUser = userRepository.findFirstByEmail(userDetails.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails.getUsername());

        if (optionalUser.isPresent()) {
            response.getWriter().write(new JSONObject()
                    .put("userId", optionalUser.get().getId())
                    .put("role", optionalUser.get().getRole())
                    .toString()
            );
            response.addHeader("Access-Control-Expose-Headers", HEADER_STRING);
            response.addHeader("Access-Control-Allow-Headers", "Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept, X-Custom-header");
            response.addHeader(HEADER_STRING, TOKEN_PREFIX + " " + jwt); // Corrected the typo and added space after PREFIX
            System.out.println("User Logged in Successfully !!!");
        }
    }

    @PostMapping("/sign-up")
    public ResponseEntity<?> signupUser(@RequestBody SignupRequest signupRequest){

        if(authService.hasUserWithEmail(signupRequest.getEmail())){
            return new ResponseEntity<>("User Alredy Exist", HttpStatus.NOT_ACCEPTABLE);
        }
        UserDto userDto = authService.createUser(signupRequest);
        return new ResponseEntity<>(userDto , HttpStatus.OK);
    }
}
