package com.example.authjava.Repositories;

import com.example.authjava.Data.Models.RoleModel;
import com.example.authjava.Data.Models.RoleUserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.ArrayList;
import java.util.List;

public interface RoleRepository extends JpaRepository<RoleModel, Long> {
    RoleModel findByName(String name);

    @Modifying
    @Query(
        nativeQuery = true,
        value = "INSERT INTO users_roles(role_id, user_id) VALUES (:roleId, :userId)"
    )
    void addRoleToUser(@Param("roleId") Long roleId, @Param("userId") Long userId);

    @Modifying
    @Query(
        nativeQuery = true,
        value = "DELETE FROM users_roles WHERE role_id=:roleId AND user_id=:userId"
    )
    void removeRoleFromUser(@Param("roleId") Long roleId, @Param("userId") Long userId);

    @Query(
        nativeQuery = true,
        value = "SELECT r.id, r.name " +
                "FROM users_roles as ur, roles as r " +
                "WHERE ur.user_id=:userId AND ur.role_id=r.id"
    )
    ArrayList<RoleModel> findUserRoles(@Param("userId") Long userId);
}
