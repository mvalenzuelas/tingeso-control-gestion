package com.example.authjava.Repositories;

import com.example.authjava.Data.Models.UserModel;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserModel, Long> {
    UserModel findByEmail(String email);

    Optional<UserModel> findById(Long userId);
}
