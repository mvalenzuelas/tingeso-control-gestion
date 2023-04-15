package com.example.authjava.Controllers;

import com.example.authjava.Services.IRoleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/roles")
@RestController
@RequiredArgsConstructor
public class RoleController {

    
    private final IRoleService roleService;


    @PostMapping()
    public void createRole() {
        return;
    }

    @GetMapping()
    public ResponseEntity<List<String>> getRoles() {
        return new ResponseEntity<>(roleService.findAllRoles(), HttpStatus.OK);
    }

    @PostMapping("/{roleId}/{userId}")
    @Transactional
    public ResponseEntity addRoleToUser(@PathVariable String roleName, @PathVariable String email) {
        roleService.addRoleToUser(roleName, email);
        return ResponseEntity.ok().build();
    }

    @Transactional
    @DeleteMapping("/{roleId}/{userId}")
    public ResponseEntity removeRoleToUser(@PathVariable Long roleId, @PathVariable Long userId) {
        roleService.removeRoleFromUser(roleId, userId);
        return ResponseEntity.ok().build();
    }
}
