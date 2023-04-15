package com.example.authjava.Services;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import com.example.authjava.Data.Models.RoleModel;

public interface IRoleService {
    
    public RoleModel save(String roleName);
    
    @Transactional
    public void addRoleToUser(String roleName, String email);

    public ArrayList<RoleModel> findUserRoles(Long id);

    public List<String> findAllRoles();

    public void removeRoleFromUser(Long roleId, Long userId);
}
