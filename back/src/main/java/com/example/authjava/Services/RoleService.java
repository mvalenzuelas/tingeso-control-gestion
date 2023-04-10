package com.example.authjava.Services;

import com.example.authjava.Data.Models.RoleModel;
import com.example.authjava.Data.Models.RoleUserModel;
import com.example.authjava.Data.Models.UserModel;
import com.example.authjava.Repositories.RoleRepository;
import com.example.authjava.Repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class RoleService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    public RoleModel save(String roleName) {
        return roleRepository.save(new RoleModel(null, roleName));
    }

    @Transactional
    public void addRoleToUser(String roleName, String email) {
        UserModel user = userRepository.findByEmail(email);
        RoleModel role = roleRepository.findByName("ROLE_" + roleName);
        roleRepository.addRoleToUser(role.getId(), user.getId());
    }


    public ArrayList<RoleModel> findUserRoles(Long id) {
        return roleRepository.findUserRoles(id);
    }
}
