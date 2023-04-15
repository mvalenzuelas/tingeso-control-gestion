package com.example.authjava.Controllers;

import com.example.authjava.Data.DTOs.UserClientDTO;
import com.example.authjava.Data.Models.UserModel;
import com.example.authjava.Services.IUserService;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class UserController {
    
    @Autowired
    @Qualifier("UserService")
    private final IUserService userService;
    
    @PostMapping
    ResponseEntity createUser(@RequestBody RegisterRequest userRequest) {
        try {
            UserModel user = userService.saveUser(new UserModel(null,
                userRequest.getFirstName(),
                userRequest.getLastName(),
                userRequest.getPassword(),
                userRequest.getEmail(),
                true
            ));
            return new ResponseEntity<UserModel>(user, HttpStatus.CREATED);
        } catch(Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping()
    ResponseEntity<ArrayList<UserClientDTO>> getUsers() {
        return ResponseEntity.ok(userService.getFullUsers());
    }

    @GetMapping("/{userId}")
    ResponseEntity getUser(@PathVariable Long userId) {
        return ResponseEntity.ok(userService.getUser(userId));
    }

    @GetMapping("/download")
    ResponseEntity getDownload() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String authStr = auth.getPrincipal() + ", ";
        for (var grantedAuthority : auth.getAuthorities()) {
            authStr += " " + grantedAuthority;
        }

        return new ResponseEntity("validado: " + authStr, HttpStatus.OK);
    }

    @Data
    public static class RegisterRequest {
        private String firstName, lastName, email, password;
    }
}
