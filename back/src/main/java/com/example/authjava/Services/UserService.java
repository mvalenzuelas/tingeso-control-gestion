package com.example.authjava.Services;

import com.example.authjava.Data.DTOs.UserClientDTO;
import com.example.authjava.Data.Models.RoleModel;
import com.example.authjava.Data.Models.UserModel;
import com.example.authjava.Repositories.RoleRepository;
import com.example.authjava.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class UserService {
    private final UserRepository userRepository;
    private final RoleService roleService;
    private final PasswordEncoder passwordEncoder;

    public UserModel saveUser(UserModel user) {
        log.info("Saving new user {} to the database", user.getFirstName());
        user.setPassword(
            passwordEncoder.encode(user.getPassword())
        );
        UserModel finalUser = userRepository.save(user);
        roleService.addRoleToUser("USER", finalUser.getEmail());
        return finalUser;
    }

    public ArrayList<UserClientDTO> getFullUsers() {
        var clientUsers = new ArrayList<UserClientDTO>();
        List<UserModel> users = userRepository.findAll();
        for (var user : users) {
            ArrayList<RoleModel> userRoles = roleService.findUserRoles(user.getId());
            UserClientDTO clientUser = new UserClientDTO(
                user.getId(),
                user.getEmail(),
                user.getFirstName(),
                user.getLastName(),
                new ArrayList<>(userRoles.stream().map(RoleModel::getName).collect(Collectors.toList()))
            );
            clientUsers.add(clientUser);
        }
        return clientUsers;
    }


    public UserClientDTO getUser(Long userId) {
        Optional<UserModel> user = userRepository.findById(userId);
        return UserClientDTO.fromUserModel(
            user.get(),
            roleService.findUserRoles(userId)
        );
    }
}
