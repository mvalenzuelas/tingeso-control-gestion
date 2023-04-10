package com.example.authjava.Controllers;

import com.example.authjava.Data.Models.RoleModel;
import com.example.authjava.Repositories.RoleRepository;
import com.example.authjava.Services.RoleService;
import com.example.authjava.Services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import javax.management.relation.Role;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/roles")
@RestController
@RequiredArgsConstructor
@Slf4j
public class RoleController {
    private final UserService userService;
    private final RoleRepository roleRepository;
    private final RoleService roleService;


    @PostMapping()
    public void createRole() {
        return;
    }

    @GetMapping()
    public ResponseEntity<List<RoleModel>> getRoles() {
        return new ResponseEntity<>(roleRepository.findAll(), HttpStatus.OK);
    }

    @PostMapping("/{roleId}/{userId}")
    @Transactional
    public ResponseEntity addRoleToUser(@PathVariable Long roleId, @PathVariable Long userId) {
        roleRepository.addRoleToUser(roleId, userId);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("/{roleId}/{userId}")
    public ResponseEntity removeRoleToUser(@PathVariable Long roleId, @PathVariable Long userId) {
        roleRepository.removeRoleFromUser(roleId, userId);
        return ResponseEntity.ok().build();
    }
}
