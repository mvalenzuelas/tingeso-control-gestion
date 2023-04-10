package com.example.authjava.Controllers;

import com.example.authjava.Data.DTOs.UserClientDTO;
import com.example.authjava.Data.Models.RoleModel;
import com.example.authjava.Data.Models.UserModel;
import com.example.authjava.Repositories.RoleRepository;
import com.example.authjava.Repositories.UserRepository;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.stream.Collectors;

@RequestMapping("/auth")
@RestController
@RequiredArgsConstructor
@Slf4j
public class AuthController {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    private final UserDetailsService userDetailsService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/login")
    ResponseEntity login(@RequestBody LoginRequest request) {
        try {
            var userDetails = userDetailsService.loadUserByUsername(request.getEmail());
            var token = new UsernamePasswordAuthenticationToken(
                userDetails,
                request.getPassword(),
                userDetails.getAuthorities()
            );
            authenticationManager.authenticate(token);
            if (token.isAuthenticated()) {
                SecurityContextHolder.getContext().setAuthentication(token);

                UserModel retrievedUser = userRepository.findByEmail(token.getName());
                ArrayList<RoleModel> roles = roleRepository.findUserRoles(retrievedUser.getId());

                UserClientDTO userAuth = new UserClientDTO(
                    retrievedUser.getId(),
                    retrievedUser.getEmail(),
                    retrievedUser.getFirstName(), retrievedUser.getLastName(),
                    new ArrayList<>(roles.stream().map(RoleModel::getName).collect(Collectors.toList()))
                );
                return ResponseEntity.ok(userAuth);
            }
        } catch (Exception e) {
            log.info("Exception: {}", e.getMessage());
            return ResponseEntity.badRequest().body(e.getMessage());
        }

        return ResponseEntity.status(500).build();
    }

    @GetMapping("/user")
    ResponseEntity getUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        UserModel retrievedUser = userRepository.findByEmail(auth.getName());
        ArrayList<String> roles = new ArrayList<>();

        for (var authority : auth.getAuthorities()) {
            roles.add(authority.getAuthority());
        }

        UserClientDTO userAuth = new UserClientDTO(
            retrievedUser.getId(),
            retrievedUser.getEmail(),
            retrievedUser.getFirstName(), retrievedUser.getLastName(),
            roles
        );

        return ResponseEntity.ok(userAuth);
    }

    @Data
    private static class LoginRequest {
        private Long id;
        private String email, password;
    }

}
